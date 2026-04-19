/**
 * Worker thread that reads a gzipped profile from sourcePath, re-serializes it
 * with timeDeltas (replacing absolute time arrays), and writes the gzipped
 * result to destPath. Responds with { _id, newSize }.
 */

import { parentPort } from 'worker_threads';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function loadProfileFromDisk(profilePath) {
  const compressed = fs.readFileSync(profilePath);
  return JSON.parse(zlib.gunzipSync(compressed).toString('utf8'));
}

// Convert absolute time array to delta-encoded timeDeltas. Accepts either
// shape on input (matching the profiler's own tolerance on read).
function serializeSamples({ time, timeDeltas, ...rest }) {
  if (timeDeltas) {
    return { timeDeltas, ...rest };
  }
  return {
    timeDeltas: time.map((t, i) => i === 0 ? t : t - time[i - 1]),
    ...rest,
  };
}

function serializeSampleHolder({ samples, ...rest }) {
  return { ...rest, samples: serializeSamples(samples) };
}

function serializeProfile({ counters, threads, ...rest }) {
  return {
    ...rest,
    threads: threads.map(serializeSampleHolder),
    counters: counters.map(serializeSampleHolder),
  };
}

// timeDeltas support was added in preprocessedProfileVersion 50. Older
// profiles are re-gzipped as-is so the profiler still parses them.
function optimizeProfile(sourcePath, destPath) {
  const profile = loadProfileFromDisk(sourcePath);
  const output = profile.meta.preprocessedProfileVersion >= 50
    ? serializeProfile(profile)
    : profile;
  const compressed = zlib.gzipSync(Buffer.from(JSON.stringify(output), 'utf8'));
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, compressed);
  return compressed.length;
}

parentPort.on('message', (msg) => {
  try {
    const newSize = optimizeProfile(msg.sourcePath, msg.destPath);
    parentPort.postMessage({ _id: msg._id, newSize });
  } catch (error) {
    parentPort.postMessage({ _id: msg._id, error: error.message });
  }
});
