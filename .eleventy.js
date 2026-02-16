import Profiler from '11ty-fx-profiler';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import CleanCSS from "clean-css";
import {PurgeCSS} from "purgecss";
import purgeHtml from "purgecss-from-html";
import htmlmin from "html-minifier";
import Image from "@11ty/eleventy-img";
import UglifyJS from "uglify-js";
import pluginRss from "@11ty/eleventy-plugin-rss";
import timeToRead from "eleventy-plugin-time-to-read";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { spawn } from 'child_process';
import https from 'https';

const isDev = process.env.ELEVENTY_ENV === 'dev';
const baseUrl = isDev ? 'http://localhost:8080' : 'https://combien-consomme.fr';
const profilerUrl = isDev ? 'http://localhost:4242' : 'https://profiler.firefox.com'

moment.locale('fr');

const pricePerKWh = 0.2516; // EDF option Base, Février 2024
const priceTooltip = `Tarif EDF option Base (Février 2024), ${pricePerKWh} € TTC par kWh`;

const nbsp = "&nbsp;";

var UserBenchmarks;

function formatDuration(timeMs) {
  let result = "";
  let timeS = Math.round(timeMs / 1000);
  if (timeS >= 60) {
    let timeMin = Math.floor(timeS / 60);
    if (timeMin >= 60) {
      let timeHours = Math.floor(timeMin / 60);
      if (timeHours >= 24) {
        result = Math.floor(timeHours / 24) + "j";
        let hour = timeHours % 24;
        if (hour) {
          result += hour + "h";
        }
      } else {
        result = timeHours + "h";
        let min = timeMin % 60;
        if (min) {
          result += min + "min";
        }
      }
    } else {
      let sec = timeS % 60;
      result = timeMin + "min";
      if (sec) {
        result += sec + "s";
      }
    }
  } else {
    result = timeMs < 1000 ? Math.round(timeMs) + "ms" : timeS + "s";
  }

  return result;
}

function toPrecisionIfNotInt(number, decimalSeparator = ",") {
  // Because of floating point representations, we can get numbers like
  // 8.000000000000007. Treat them as if they were integers.
  let isAlmostInt = Math.round(number) == Math.round(number * 1000) / 1000;
  return isAlmostInt ? Math.round(number)
                     : number.toPrecision(3).replace(/\./,
                                                     decimalSeparator);
}

function formatVoltage(voltageV) {
  return toPrecisionIfNotInt(voltageV) + nbsp + "V";
}

function formatPower(powerW) {
  const absPower = Math.abs(powerW);
  if (absPower < 1) {
    return toPrecisionIfNotInt(powerW * 1000) + nbsp + "mW";
  }

  if (absPower > 1000) {
    return toPrecisionIfNotInt(powerW / 1000) + nbsp + "kW";
  }

  return toPrecisionIfNotInt(powerW) + nbsp + "W";
}

function roundPower(powerW) {
  return toPrecisionIfNotInt(powerW, ".");
}

function formatEnergy(energyWh) {
  if (energyWh < 1 && energyWh > 0) {
    return toPrecisionIfNotInt(energyWh * 1000) + nbsp + "mWh";
  }

  if (energyWh > 1000) {
    return toPrecisionIfNotInt(energyWh / 1000) + nbsp + "kWh";
  }

  return toPrecisionIfNotInt(energyWh) + nbsp + "Wh";
}

function roundEnergy(energyWh) {
  return toPrecisionIfNotInt(energyWh, ".");
}

function formatEuro(costEuro) {
  function fixed(number, maxDigits = 2) {
    let fractionDigits = Math.round(number) == number ? 0 : maxDigits;
    return number.toLocaleString("fr", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  }
  return (costEuro < 0.1 ?
          (costEuro < 0.001 ? "&lt; " + fixed(0.001, 3) : fixed(costEuro, 3))
          : fixed(costEuro)) + nbsp + "€";
}

function formatCost(energyWh) {
  let costEuro = energyWh * pricePerKWh / 1000;
  let formattedValue = formatEuro(costEuro);
  let tooltip = priceTooltip;
  if (isDev) {
    tooltip = costEuro + "€ — " + tooltip;
  }
  return `<span title="${tooltip}">${formattedValue}</span>`;
}

function formatEnergyCost(energyWh) {
  return `${formatEnergy(energyWh)} (${formatCost(energyWh)})`;
}

// Helper function to rebuild a draft preview
// TODO: Should use --incremental=<filepath> but it's broken in Eleventy 3.x
// (throws "`templateRender` has not yet initialized" error)
// Instead, we use ELEVENTY_PREVIEW_ONLY env var to ignore everything except this preview
function rebuildDraftPreview(slug) {
  return new Promise((resolve, reject) => {
    const buildProcess = spawn('npx', ['@11ty/eleventy'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        ELEVENTY_PREVIEW_ONLY: `draft/${slug}/preview`
      }
    });

    let buildOutput = '';
    let buildError = '';

    buildProcess.stdout.on('data', (data) => {
      const str = data.toString();
      buildOutput += str;
      process.stdout.write(str);
    });

    buildProcess.stderr.on('data', (data) => {
      const str = data.toString();
      buildError += str;
      process.stderr.write(str);
    });

    buildProcess.on('error', (error) => {
      reject(new Error(`Build process failed: ${error.message}`));
    });

    buildProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Build failed with code ${code}: ${buildError}`));
      } else {
        resolve({ success: true, output: buildOutput });
      }
    });
  });
}

async function publishDraftToProduction(slug) {
  const draftPreviewPath = path.join('draft', slug, 'preview');
  const draftTestPath = path.join(draftPreviewPath, 'tests', `${slug}.md`);
  const imagesPath = 'images';
  const profilesPath = 'profiles';
  const draftImagesPath = path.join(draftPreviewPath, imagesPath);
  const draftProfilesPath = path.join(draftPreviewPath, profilesPath);

  const testPath = path.join('tests', `${slug}.md`);

  // Validate source files exist
  if (!fs.existsSync(draftTestPath)) {
    throw new Error(`Draft test file not found: ${draftTestPath}`);
  }
  if (!fs.existsSync(draftProfilesPath)) {
    throw new Error(`Draft profiles directory not found: ${draftProfilesPath}`);
  }

  // Read and process the test file
  const content = fs.readFileSync(draftTestPath, 'utf-8');

  // Extract front matter ([\s\S] matches any character including newlines)
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontMatterMatch) {
    throw new Error('Invalid markdown file: missing front matter');
  }

  const [, frontMatter, bodyWithChecklist] = frontMatterMatch;

  // Extract publishing checklist comment
  const checklistMatch = bodyWithChecklist.match(/{% comment %}\s*PUBLISHING CHECKLIST:([\s\S]*?){% endcomment %}\s*/);
  let existingTestsEntry = '';
  let body = bodyWithChecklist;

  if (checklistMatch) {
    const checklistContent = checklistMatch[1];
    // Extract the existing-tests.md entry (look for the ### slug heading after the checklist intro)
    const entryMatch = checklistContent.match(/###\s+\S+[\s\S]*$/m);
    if (entryMatch) {
      existingTestsEntry = entryMatch[0].trim();
    }
    // Remove the entire checklist comment from body
    body = body.replace(checklistMatch[0], '');
  }

  // Check for remaining TODOs
  const todoMatches = body.match(/TODO:/g);
  if (todoMatches && todoMatches.length > 0) {
    throw new Error(`Found ${todoMatches.length} TODO marker(s) in the draft. Please complete all tasks before publishing.`);
  }

  // Extract title from front matter
  const titleMatch = frontMatter.match(/^title:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;

  // Update front matter - split into lines to avoid creating empty lines
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const frontMatterLines = frontMatter.split('\n')
    .map(line => {
      if (line.match(/^layout:/)) return 'layout: test-layout.njk';
      if (line.match(/^tags:/)) return "tags: ['test']";
      if (line.match(/^isDraft:/)) return null;  // Remove this line
      if (line.match(/^basePath:/)) return null;  // Remove this line
      if (line.match(/^date:/)) return `date: ${today}`;
      if (line.match(/^img:/)) {
        const imgPath = line.split(':')[1].trim();
        const filename = path.basename(imgPath);
        return `img: ${filename}`;
      }
      return line;
    })
    .filter(line => line !== null)  // Remove null lines
    .join('\n');

  // Reconstruct the file
  const updatedContent = `---\n${frontMatterLines}\n---\n${body}`;

  // Copy files
  fs.writeFileSync(testPath, updatedContent, 'utf-8');

  // Copy images and track them
  const copiedImages = [];
  if (fs.existsSync(draftImagesPath)) {
    const images = fs.readdirSync(draftImagesPath);
    for (const image of images) {
      const srcPath = path.join(draftImagesPath, image);
      const destPath = path.join(imagesPath, image);
      fs.copyFileSync(srcPath, destPath);
      copiedImages.push(destPath);
    }
  }

  // Copy all profiles and track them
  const copiedProfiles = [];
  const profiles = fs.readdirSync(draftProfilesPath);
  for (const profile of profiles) {
    const srcPath = path.join(draftProfilesPath, profile);
    const destPath = path.join(profilesPath, profile);
    fs.copyFileSync(srcPath, destPath);
    copiedProfiles.push(destPath);
  }

  // Append to existing-tests.md if we have an entry
  if (existingTestsEntry) {
    const existingTestsPath = 'draft/existing-tests.md';
    const existingTestsContent = fs.readFileSync(existingTestsPath, 'utf-8');
    fs.writeFileSync(existingTestsPath, existingTestsContent + '\n' + existingTestsEntry + '\n', 'utf-8');
  }

  // Update data.json to mark as published
  const draftData = loadDraftData(slug);
  draftData.published = new Date().toISOString();
  saveDraftData(slug, draftData);

  // Prepare Claude prompt
  const claudePrompt = `I just published a new test: "${slug}". Please read tests/${slug}.md and add relevant cross-references in related existing tests where appropriate. This could be in "Pour aller plus loin" sections, or when describing similar devices. Look for tests with:
- Similar device types
- Related consumption patterns
- Comparative insights that would be valuable to readers`;

  // Prepare git commands
  const gitCommands = [
    `git add tests/${slug}.md images/ ${copiedProfiles.join(' ')} draft/existing-tests.md`,
    `git commit -m "Ajout du test d'${title}."`,
    `git push`
  ];

  return {
    success: true,
    slug,
    files: {
      test: testPath,
      profiles: copiedProfiles,
      images: copiedImages
    },
    claudePrompt,
    gitCommands,
    existingTestsUpdated: !!existingTestsEntry
  };
}

const profileCache = new Map();

async function loadProfile(profilePath) {
  if (profileCache.has(profilePath)) {
    return profileCache.get(profilePath);
  }

  const b = UserBenchmarks.get("> profile > load: " + profilePath);
  b.before();

  function streamToString (stream) {
    const buffers = [];
    return new Promise((resolve, reject) => {
      stream.on('data', data => buffers.push(data));
      stream.on('error', err => reject(err));
      stream.on('end', () => resolve(Buffer.concat(buffers).toString('utf8')));
    });
  }

  function unserializeSamples({ timeDeltas, time, ...restOfSamples }) {
    let lastTime = 0;
    return {
      time: time || (timeDeltas).map(function unserializeTime(delta) {
        lastTime = lastTime + delta;
        return lastTime;
      }),
      ...restOfSamples,
    };
  }

  let promise = new Promise(async function unserializeProfile(resolve) {
    let rv = JSON.parse(await streamToString(fs.createReadStream(profilePath)
                                               .pipe(zlib.createGunzip())));

    // Undo differential timestamp compression.
    let {counters, ...restOfProfile} = rv;
    rv = {
      ...restOfProfile,
      counters: counters.map(function unserializeCounter({ samples, ...restOfCounter }) {
        return {
          ...restOfCounter,
          samples: unserializeSamples(samples),
        };
      })
    };

    b.after();
    resolve(rv);
  });
  profileCache.set(profilePath, promise);
  return promise;
}

function getStatsFromCounterSamples(profileStringId, profile, samples, range = "",
                                    keepAllSamples = false) {
  const b = UserBenchmarks.get("> profile > stats: " + profileStringId);
  b.before();

  const profilingStartTime = profile.meta.profilingStartTime || 0;
  function time(i) {
    return Math.max(0, samples.time[i] - profilingStartTime);
  }
  
  let powerValues = [];
  let firstSample = 0, lastSample = 0;
  let start = -Infinity;
  let end = Infinity;
  if (range) {
    let [v1, v2] = range.split("m");
    if (v1) {
      start = parseInt(v1);
    }
    if (v2) {
      end = (v1 ? parseInt(v1) : 0) + parseInt(v2);
    }
  }

  let extraZeros = 0;
  for (let i = 0; i < samples.length; ++i) {
    if (time(i) < start) {
      continue;
    }
    if (time(i) > end) {
      if (powerValues[powerValues.length - 1] == 0) {
        // If the last sample was 0W, continue drawing until the end of the specified range.
        let missingZeros = Math.round((end - time(i - 1)) / profile.meta.interval) - 1;
        if (missingZeros >= 1) {
          extraZeros += missingZeros;
        }
        lastSample = i;
        powerValues.push(0);
      }
      break;
    }
    if (powerValues.length == 0) {
      if (samples.count[i] == 0 && !keepAllSamples) {
        continue;
      }
      // If the profile starts with 0W samples, keep at least one 0.
      if (i > 0 && time(i - 1) >= start) {
        powerValues.push(0);
        firstSample = i - 1;
      } else {
        firstSample = i;
      }
    }
    if (samples.count[i] || keepAllSamples) {
      lastSample = i;
    }

    if (!keepAllSamples && i > 0 &&
        samples.count[i] == 0 && samples.count[i - 1] == 0 &&
        (end !== Infinity || i < samples.length - 1)) {
      let missingZeros = Math.round((samples.time[i] - samples.time[i - 1]) / profile.meta.interval - 1);
      if (missingZeros >= 1) {
        extraZeros += missingZeros;
      }
    }

    powerValues.push(Math.round(samples.count[i] / ((i == 0 ? profile.meta.interval : (samples.time[i] - samples.time[i - 1])) / 3600)) / 1e9);
  }

  // Remove trailing 0s that could affect the median.
  if (end === Infinity && lastSample < samples.length - 1 && !keepAllSamples) {
    let removeCount = samples.length - 1 - lastSample;
    powerValues.splice(-removeCount, removeCount);
  }
  let values = powerValues.slice();
  if (extraZeros) {
    powerValues = powerValues.concat(Array(extraZeros).fill(0));
  }
  powerValues.sort(function compare(a, b) { return a - b; });

  // Calculate the duration including the first sample's interval
  let firstSampleInterval;
  let firstSampleActualInterval; // The actual interval of the first sample (before range clipping)
  if (start > -Infinity && firstSample > 0) {
    // If a specific start range was specified, use the time from the range start to the first sample
    firstSampleActualInterval = firstSample == 0 ? profile.meta.interval : (samples.time[firstSample] - samples.time[firstSample - 1]);
    firstSampleInterval = time(firstSample) - start;
  } else {
    // Otherwise use the regular sampling interval (not the actual time to previous sample,
    // which could be much longer if zeros were merged)
    firstSampleInterval = profile.meta.interval;
    firstSampleActualInterval = firstSampleInterval;
  }
  let durationMs = Math.min(end, time(lastSample)) - time(firstSample) + firstSampleInterval;

  // Calculate energy, adjusting the first sample proportionally if it's clipped by the range
  let firstSampleEnergyRatio = firstSampleInterval / firstSampleActualInterval;
  let energyWh = samples.count.slice(firstSample + 1, lastSample + 1).reduce(function sampleReducer(acc, val) {
    return acc + val;
  }, samples.count[firstSample] * firstSampleEnergyRatio) / 1e12;

  let stats = {
    durationMs, energyWh,
    medianPowerW: powerValues[Math.floor(powerValues.length / 2)],
    maxPowerW: powerValues[powerValues.length - 1],
    averagePowerW: energyWh / (durationMs / 3600000)
  };

  b.after();
  return {stats, firstSample, lastSample, values, firstSampleInterval};
}

function profilerLink(profilePath) {
  return profilerUrl + "/from-url/" + encodeURIComponent(new URL(profilePath, baseUrl).href);
}

async function profileShortcode(profile, options, userBenchmarks) {
  const profileStringId = profile + (options ? " " + options : "");
  const b = userBenchmarks.get("> profile > " + profileStringId);
  b.before();

  options = options ? JSON.parse(options) : {};
  const graphHeight = 120;
  const graphWidth = 2400;
  const halfStrokeWidth = 3;
  function makeSVGPath(graph) {
    const b = userBenchmarks.get("> profile > SVG path: " + profileStringId);
    b.before();

    let lastLetter = "";
    function letter(l) {
      if (l == lastLetter) {
        return "";
      }
      lastLetter = l;
      return l;
    }
    let lastX = -2 * halfStrokeWidth;
    let lastY = graphHeight;
    let path = `${letter('M')}${lastX} ${lastY}`;
    function append(cmd) {
      if (/^\d/.test(cmd) && /\d$/.test(path)) {
        path += " ";
      }
      path += cmd;
    }
    function appendShorterV(y) {
      let v = `${lastLetter != 'v' ? 'v' : ''}${y - lastY}`;
      let V = `${lastLetter != 'V' ? 'V' : ''}${y}`;
      if (v.length <= V.length) {
        append(v);
        lastLetter = 'v';
      } else {
        append(V);
        lastLetter = 'V';
      }
    }

    let x = i => Math.max(halfStrokeWidth, Math.min(graph[i].x * graphWidth, graphWidth - halfStrokeWidth)).toFixed();
    let y = i => graph[i].y == 0 ? graphHeight + halfStrokeWidth
        : Math.max(halfStrokeWidth, (1 - graph[i].y) * graphHeight).toFixed();
    // draw a first point the right height and x = -strokeWidth.
    {
      let yi = y(0);
      appendShorterV(yi);
      lastY = yi;
    }
    for (let i = 0; i < graph.length; ++i) {
      let xi = x(i);
      let yi = y(i);
      if (xi == lastX && yi == lastY) {
        continue;
      }
      if (yi == lastY) {
        while (i + 1 < graph.length && y(i + 1) == lastY) {
          xi = x(++i);
        }
        append(`${letter('h')}${xi - lastX}`);
      } else {
        if (xi == lastX) {
          let ys = [yi];
          let j = 1;
          while (i + j < graph.length && x(i + j) == xi) {
            ys.push(y(i + j));
            j++;
          }
          let usefulYs = [];
          let max = Math.max(...ys);
          let min = Math.min(...ys);
          let last = ys[ys.length - 1];
          if (max != last && max > lastY) {
            usefulYs.push(max);
          }
          if (min != last && min < lastY) {
            usefulYs.push(min);
          }
          usefulYs.push(last);

          i += j - 1;
          for (let usefulY of usefulYs) {
            yi = usefulY;
            appendShorterV(yi);
            lastY = yi;
          }
        } else {
          append(`${letter('l')}${xi - lastX}`);
          append(`${yi - lastY}`);
        }
      }
      lastX = xi;
      lastY = yi;
    }

    // draw a last point, at x = graphWidth + 2*strokeWidth, y = lastY
    append(`${letter('h')}${(graphWidth + 2*halfStrokeWidth) - lastX}`);

    // Move down to ${graphHeight} to ensure the filled area is correct.
    appendShorterV(graphHeight);

    b.after();
    return path;
  }

  const basePath = options.path || './profiles/';
  const profilePath = basePath + profile;
  let {counters, meta} = await loadProfile(profilePath);

  let profilerQuery = "";
  let profilerQueryParams = [];
  if (options.name) {
    profilerQueryParams.push("profileName=" + options.name);
  }
  if (options.range) {
    profilerQueryParams.push("range=" + options.range);
    profilerQueryParams.push("v=10");
  }
  if (profilerQueryParams.length) {
    profilerQuery = "?" + profilerQueryParams.join("&");
  }
  const profilerIcon = `<a class="profiler-link" target="_blank" title="Ouvrir dans le Firefox Profiler" href="${profilerLink(profilePath)}${profilerQuery}"></a>`;

  let result = "";
  let multiCounters = counters.length > 1;
  if (multiCounters) {
    result += `<div class="profile">`
  }
  for (let {name, description, samples} of counters) {
    let {stats, firstSample, lastSample, values, firstSampleInterval} =
      getStatsFromCounterSamples(profileStringId, {meta}, samples, options.range, multiCounters);
    if (options.debug) {
      console.log(profile, options, stats);
    }
    if (values.length == 0) {
      throw new Error(`No sample in range, profile: ${profile}, options=${JSON.stringify(options)}`);
    }
    let graph = values.map(function xAndYFromValues(v, i) {
      return ({
        x: (samples.time[firstSample + i] - samples.time[firstSample] + firstSampleInterval) / stats.durationMs,
        y: v / stats.maxPowerW});
    });
    let svg = `<div><svg viewBox="0 0 ${graphWidth} ${graphHeight}">`
        + `<path d="${makeSVGPath(graph)}"/>`
        + `</svg></div>`;
    if (multiCounters) {
      result += svg;
      continue;
    }

    const profileDescription = options.name ?
        `<p title="${name}, ${values.length} échantillons">${options.name}${profilerIcon}</p>`
      : `<p>${name} : ${description}, ${values.length} échantillons.${profilerIcon}</p>`;
    result += `<div class="profile">`
      + svg
      + profileDescription
      + `<table>
<tr><th>Consommation</th><td${isDev ? ' onclick="navigator.clipboard.writeText(&quot;{{ ' + roundEnergy(stats.energyWh) + ' | Wh }}&quot;)" title="' + stats.energyWh + ' Wh"' : ''}>${formatEnergy(stats.energyWh)} — ${formatCost(stats.energyWh)}</td></tr>
<tr><th>Durée</th><td>${formatDuration(stats.durationMs)}</td></tr>
</table>
<table class="power">
<tr><th rowspan="2"><a href="/posts/quelle-puissance-mesurer/">Puissance</a></th><td>médiane</td><td>moyenne</td><td>maximale</td></tr>
<tr>
<td${isDev ? ' onclick="navigator.clipboard.writeText(&quot;{{ ' + roundPower(stats.medianPowerW) + ' | W }}&quot;)" title="' + stats.medianPowerW + ' W"' : ''}>${formatPower(stats.medianPowerW)}</td>
<td${isDev ? ' onclick="navigator.clipboard.writeText(&quot;{{ ' + roundPower(stats.averagePowerW) + ' | W }}&quot;)" title="' + stats.averagePowerW + ' W"' : ''}>${formatPower(stats.averagePowerW)}</td>
<td${isDev ? ' onclick="navigator.clipboard.writeText(&quot;{{ ' + roundPower(stats.maxPowerW) + ' | W }}&quot;)" title="' + stats.maxPowerW + ' W"' : ''}>${formatPower(stats.maxPowerW)}</td>
</tr>
</table>`
      + `</div>`;
  }
  if (multiCounters) {
    result += options.name ?
        `<p>${options.name}${profilerIcon}</p>`
      : `<p>${counters.length} enregistrements.${profilerIcon}</p>`;
    result += `</div>`;
  }

  b.after();
  return result;
}

async function image(src, alt, sizes, width, lazy = true) {
  const b = UserBenchmarks.get("> image > " + src + (width ? " (" + width + "px)" : ""));
  b.before();

  const imageOptions = {
    formats: ["avif", "jpeg", "svg"],
    svgShortCircuit: true,
    outputDir: "./_site/img/"
  };
  if (width) {
    imageOptions.widths = [width];
  }
  let metadata = await Image(src, imageOptions);

  let imageAttributes = {
    alt,
    sizes,
  };
  if (lazy) {
    imageAttributes.loading = "lazy";
    imageAttributes.decoding =  "async";
  } else {
    imageAttributes.decoding =  "sync";
  }

  // You bet we throw an error on a missing alt (alt="" works okay)
  let rv = Image.generateHTML(metadata, imageAttributes);

  b.after();
  return rv;
}

// Draft data helpers (used by both middleware and publish function)
function loadDraftData(slug) {
  const dataPath = `./draft/${slug}/data.json`;

  if (fs.existsSync(dataPath)) {
    try {
      return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } catch (error) {
      // Invalid JSON, fall through to default
    }
  }

  return { ranges: [], title: null, images: {}, profiles: {}, notes: '', comments: [] };
}

function saveDraftData(slug, data) {
  const dataPath = `./draft/${slug}/data.json`;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

function setupDevMiddleware(middleware) {
  // Helper functions for API responses
  function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

  // Parse JSON body for POST and PATCH requests
  middleware.push(function(req, res, next) {
    if ((req.method === 'POST' || req.method === 'PATCH') && req.headers['content-type']?.includes('application/json')) {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
        } catch (e) {
          req.body = {};
        }
        next();
      });
    } else {
      next();
    }
  });

  // Cache external libraries for offline use
  middleware.push(async function(req, res, next) {
    if (!req.url.startsWith('/draft/libs/')) {
      next();
      return;
    }

    const libraryMap = {
      'tesseract.min.js': 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
      'opencv.js': 'https://docs.opencv.org/4.x/opencv.js'
    };

    const filename = path.basename(req.url);
    const remoteUrl = libraryMap[filename];

    if (!remoteUrl) {
      next();
      return;
    }

    const cacheDir = path.join(process.cwd(), 'draft', 'libs');
    const cacheFile = path.join(cacheDir, filename);

    const serveContent = (content) => {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.end(content);
    };

    // Serve from cache if available
    if (fs.existsSync(cacheFile)) {
      serveContent(fs.readFileSync(cacheFile));
      return;
    }

    // Download and cache
    try {
      https.get(remoteUrl, (response) => {
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          const content = Buffer.concat(chunks);

          // Create cache directory if needed
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
          }

          // Save to cache
          fs.writeFileSync(cacheFile, content);

          // Serve
          serveContent(content);
        });
      }).on('error', (error) => {
        console.error(`Failed to download ${remoteUrl}:`, error);
        next();
      });
    } catch (error) {
      console.error('Library caching error:', error);
      next();
    }
  });

  // Rebuild preview test pages when accessed
  middleware.push(async function(req, res, next) {
    const previewTestMatch = req.url.match(/^\/draft\/([^/]+)\/preview\/tests\/\1\/?(?:\?.*)?$/);
    if (previewTestMatch) {
      const [, slug] = previewTestMatch;
      try {
        await rebuildDraftPreview(slug);
      } catch (error) {
        console.error('Failed to rebuild preview:', error);
      }
    }
    next();
  });

  // Serve draft files directly from draft folder (including preview subfolder)
  middleware.push(function(req, res, next) {
    const draftFileMatch = req.url.match(/^\/draft\/([^/]+)\/((preview\/)?(.+)\.(jpg|jpeg|png|gif|webp|json\.gz|js))(?:\?.*)?$/);
    if (draftFileMatch) {
      const [, slug, relativePath] = draftFileMatch;
      const decodedRelativePath = decodeURIComponent(relativePath);
      const filePath = path.join(process.cwd(), 'draft', slug, decodedRelativePath);

      if (fs.existsSync(filePath)) {
        const ext = path.extname(relativePath).toLowerCase();
        const mimeTypes = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.webp': 'image/webp',
          '.gz': 'application/gzip',
          '.js': 'application/javascript'
        };

        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
        return;
      } else {
        console.log('Draft file not found:', filePath);
      }
    }
    next();
  });

  // Draft API endpoints
  middleware.push(async function(req, res, next) {
    const url = req.url;

    // GET /api/draft/:slug/data
    const getData = /^\/api\/draft\/([^/]+)\/data$/;
    if (req.method === 'GET' && getData.test(url)) {
      const [, slug] = url.match(getData);
      const data = loadDraftData(slug);
      sendJSON(res, 200, data);
      return;
    }

    // POST /api/draft/:slug/save-range
    const saveRange = /^\/api\/draft\/([^/]+)\/save-range$/;
    if (req.method === 'POST' && saveRange.test(url)) {
      const [, slug] = url.match(saveRange);
      const { range, name, file, shortcode } = req.body || {};

      if (!name) {
        sendJSON(res, 400, { error: 'Missing required fields' });
        return;
      }

      const data = loadDraftData(slug);
      if (!data.ranges) {
        data.ranges = [];
      }

      const id = Date.now().toString();
      data.ranges.push({ id, range, name, file, shortcode });

      try {
        saveDraftData(slug, data);
        sendJSON(res, 200, { success: true, id });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // DELETE /api/draft/:slug/range/:id
    const deleteRange = /^\/api\/draft\/([^/]+)\/range\/([^/]+)$/;
    if (req.method === 'DELETE' && deleteRange.test(url)) {
      const [, slug, rangeId] = url.match(deleteRange);

      const data = loadDraftData(slug);
      if (!data.ranges) {
        sendJSON(res, 404, { error: 'Range not found' });
        return;
      }

      data.ranges = data.ranges.filter(r => r.id !== rangeId);

      try {
        saveDraftData(slug, data);
        sendJSON(res, 200, { success: true });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // PATCH /api/draft/:slug/update-range/:id
    const updateRange = /^\/api\/draft\/([^/]+)\/update-range\/([^/]+)$/;
    if (req.method === 'PATCH' && updateRange.test(url)) {
      const [, slug, rangeId] = url.match(updateRange);
      const { name, description } = req.body || {};

      const data = loadDraftData(slug);
      if (!data.ranges) {
        sendJSON(res, 404, { error: 'Range not found' });
        return;
      }

      const range = data.ranges.find(r => r.id === rangeId);
      if (!range) {
        sendJSON(res, 404, { error: 'Range not found' });
        return;
      }

      // Update fields
      if (name !== undefined) {
        range.name = name;
        // Regenerate shortcode with new name
        const shortcodeOptions = { name };
        if (range.range) {
          shortcodeOptions.range = range.range;
        }
        shortcodeOptions.path = `draft/${slug}/`;
        range.shortcode = `{% profile "${range.file}" '${JSON.stringify(shortcodeOptions).replace(/'/g, "\\'")}' %}`;
      }
      if (description !== undefined) {
        range.description = description;
      }

      try {
        saveDraftData(slug, data);
        sendJSON(res, 200, { success: true });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // PATCH /api/draft/:slug/title - Update draft title
    const updateTitle = /^\/api\/draft\/([^/]+)\/title$/;
    if (req.method === 'PATCH' && updateTitle.test(url)) {
      const [, slug] = url.match(updateTitle);
      const { title } = req.body || {};

      if (!title) {
        sendJSON(res, 400, { error: 'Missing title' });
        return;
      }

      const data = loadDraftData(slug);
      data.title = title;

      try {
        saveDraftData(slug, data);
        sendJSON(res, 200, { success: true, title });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // PATCH /api/draft/:slug/notes - Update draft notes
    const updateNotes = /^\/api\/draft\/([^/]+)\/notes$/;
    if (req.method === 'PATCH' && updateNotes.test(url)) {
      const [, slug] = url.match(updateNotes);
      const { notes } = req.body || {};

      const data = loadDraftData(slug);
      data.notes = notes || '';

      try {
        saveDraftData(slug, data);
        sendJSON(res, 200, { success: true });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // PATCH /api/draft/:slug/comments - Update draft comments
    const updateComments = /^\/api\/draft\/([^/]+)\/comments$/;
    if (req.method === 'PATCH' && updateComments.test(url)) {
      const [, slug] = url.match(updateComments);
      const { comments } = req.body || {};

      const data = loadDraftData(slug);
      data.comments = comments || [];

      try {
        saveDraftData(slug, data);
        sendJSON(res, 200, { success: true });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // PATCH /api/draft/:slug/image/:shortname - Update image metadata
    const updateImage = /^\/api\/draft\/([^/]+)\/image\/(.+)$/;
    if (req.method === 'PATCH' && updateImage.test(url)) {
      const [, slug, shortname] = url.match(updateImage);

      const data = loadDraftData(slug);
      if (!data.images) {
        data.images = {};
      }
      if (!data.images[shortname]) {
        data.images[shortname] = {};
      }

      // Update fields (source, description, width, crop)
      ['source', 'description', 'width', 'crop'].forEach(field => {
        if (req.body?.[field] !== undefined) {
          data.images[shortname][field] = req.body[field];
        }
      });

      try {
        saveDraftData(slug, data);
        sendJSON(res, 200, { success: true });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // PATCH /api/draft/:slug/profile/:filename - Update profile metadata
    const updateProfile = /^\/api\/draft\/([^/]+)\/profile\/(.+)$/;
    if (req.method === 'PATCH' && updateProfile.test(url)) {
      const [, slug, encodedFilename] = url.match(updateProfile);
      const filename = decodeURIComponent(encodedFilename);

      const data = loadDraftData(slug);
      if (!data.profiles) {
        data.profiles = {};
      }
      if (!data.profiles[filename]) {
        data.profiles[filename] = {};
      }

      // Update shortname field
      if (req.body?.shortname !== undefined) {
        data.profiles[filename].shortname = req.body.shortname;
      }

      try {
        saveDraftData(slug, data);
        sendJSON(res, 200, { success: true });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // POST /api/draft/:slug/save-preview - Save edited image to preview folder
    const savePreview = /^\/api\/draft\/([^/]+)\/save-preview$/;
    if (req.method === 'POST' && savePreview.test(url)) {
      const [, slug] = url.match(savePreview);
      const { imageData, shortname } = req.body || {};

      if (!imageData) {
        sendJSON(res, 400, { error: 'Missing imageData' });
        return;
      }

      try {
        // Convert base64 data URL to buffer
        const matches = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!matches) {
          sendJSON(res, 400, { error: 'Invalid image data format' });
          return;
        }

        const imageBuffer = Buffer.from(matches[2], 'base64');
        const draftPath = path.join(process.cwd(), 'draft', slug);

        // Create preview/images subfolder if it doesn't exist
        const previewImagesPath = path.join(draftPath, 'preview', 'images');
        if (!fs.existsSync(previewImagesPath)) {
          fs.mkdirSync(previewImagesPath, { recursive: true });
        }

        // Save as slug.jpg for 'img' (thumbnail), or slug-shortname.jpg for other shortnames
        const newFilename = shortname === 'img' ? `${slug}.jpg` : `${slug}-${shortname}.jpg`;
        const imagePath = path.join(previewImagesPath, newFilename);

        // Write the new image file
        fs.writeFileSync(imagePath, imageBuffer);

        sendJSON(res, 200, { success: true, previewFilename: `preview/images/${newFilename}` });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // DELETE /api/draft/:slug/image/:shortname - Delete image metadata and preview
    const deleteImage = /^\/api\/draft\/([^/]+)\/image\/(.+)$/;
    if (req.method === 'DELETE' && deleteImage.test(url)) {
      const [, slug, shortname] = url.match(deleteImage);

      try {
        const data = loadDraftData(slug);

        if (data.images && data.images[shortname]) {
          // Delete the image metadata
          delete data.images[shortname];

          saveDraftData(slug, data);

          // Delete the preview file if it exists
          const draftPath = path.join(process.cwd(), 'draft', slug);
          const previewImagesPath = path.join(draftPath, 'preview', 'images');

          // Preview filename: special case for 'img' (thumbnail)
          const previewFilename = shortname === 'img' ? `${slug}.jpg` : `${slug}-${shortname}.jpg`;
          const previewFilePath = path.join(previewImagesPath, previewFilename);

          if (fs.existsSync(previewFilePath)) {
            fs.unlinkSync(previewFilePath);
          }

          sendJSON(res, 200, { success: true });
        } else {
          sendJSON(res, 404, { error: 'Image not found' });
        }
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // POST /api/draft/:slug/save-profile-screenshot - Save profile screenshot PNG
    const saveProfileScreenshot = /^\/api\/draft\/([^/]+)\/save-profile-screenshot$/;
    if (req.method === 'POST' && saveProfileScreenshot.test(url)) {
      const [, slug] = url.match(saveProfileScreenshot);
      const { rangeId, imageData } = req.body || {};

      if (!rangeId || !imageData) {
        sendJSON(res, 400, { error: 'Missing rangeId or imageData' });
        return;
      }

      try {
        // Convert base64 data URL to buffer
        const matches = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!matches) {
          sendJSON(res, 400, { error: 'Invalid image data format' });
          return;
        }

        const imageBuffer = Buffer.from(matches[2], 'base64');
        const profileDataPath = path.join(process.cwd(), 'draft', slug, 'preview', 'profile-data');

        // Create profile-data folder if it doesn't exist
        if (!fs.existsSync(profileDataPath)) {
          fs.mkdirSync(profileDataPath, { recursive: true });
        }

        const screenshotPath = path.join(profileDataPath, `${rangeId}.png`);
        fs.writeFileSync(screenshotPath, imageBuffer);

        sendJSON(res, 200, { success: true, path: `draft/${slug}/preview/profile-data/${rangeId}.png` });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // POST /api/draft/:slug/generate-template - Generate template markdown and structure
    const generateTemplate = /^\/api\/draft\/([^/]+)\/generate-template$/;
    if (req.method === 'POST' && generateTemplate.test(url)) {
      const [, slug] = url.match(generateTemplate);

      try {
        const data = loadDraftData(slug);

        if (!data.ranges || data.ranges.length === 0) {
          sendJSON(res, 400, { error: 'No profile ranges defined' });
          return;
        }

        // Validate required data
        if (!data.images || !data.images['img']) {
          sendJSON(res, 400, { error: 'Main image (img) is required before generating template' });
          return;
        }

        const draftPath = path.join(process.cwd(), 'draft', slug);
        const previewPath = path.join(draftPath, 'preview');

        // Create directory structure
        const testsPath = path.join(previewPath, 'tests');
        const profilesPath = path.join(previewPath, 'profiles');
        const profileDataPath = path.join(previewPath, 'profile-data');

        [testsPath, profilesPath, profileDataPath].forEach(dir => {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
        });

        // Find which profiles have saved ranges
        const profilesWithRanges = new Set(data.ranges.map(r => r.file));

        // Validate that all profiles with ranges have shortnames
        const profiles = data.profiles || {};
        for (const profileFilename of profilesWithRanges) {
          const profileData = profiles[profileFilename];
          if (!profileData || !profileData.shortname) {
            sendJSON(res, 400, {
              error: `Profile "${profileFilename}" has saved ranges but no shortname. Please set a shortname first.`
            });
            return;
          }
        }

        // Copy and load profiles that have saved ranges (already validated to have shortnames)
        const loadedProfiles = new Map();
        for (const [profileFilename, profileData] of Object.entries(profiles)) {
          if (!profilesWithRanges.has(profileFilename)) continue; // Skip profiles with no saved ranges

          const sourceProfilePath = path.join(draftPath, profileFilename);
          if (!fs.existsSync(sourceProfilePath)) {
            sendJSON(res, 400, { error: `Profile file not found: ${profileFilename}` });
            return;
          }

          // Determine destination filename: slug.json.gz for "profile", slug-shortname.json.gz for others
          const shortname = profileData.shortname;
          const destFilename = shortname === 'profile'
            ? `${slug}.json.gz`
            : `${slug}-${shortname}.json.gz`;
          const destProfilePath = path.join(profilesPath, destFilename);
          fs.copyFileSync(sourceProfilePath, destProfilePath);

          // Load profile for generating stats
          const profile = await loadProfile(sourceProfilePath);
          loadedProfiles.set(profileFilename, profile);
        }

        // Generate stats markdown for each range
        for (const range of data.ranges) {
          const rangeId = range.id;

          // Get the profile for this range
          const profile = loadedProfiles.get(range.file);
          if (!profile) {
            console.warn(`Profile not loaded for range ${rangeId}: ${range.file}`);
            continue;
          }

          // Calculate stats
          const counter = profile.counters[0]; // TODO: handle multiple counters
          const {stats} = getStatsFromCounterSamples(
            rangeId,
            profile,
            counter.samples,
            range.range,
            false
          );

          // Generate markdown file with stats for Claude
          const statsMd = `# ${range.name}
${range.description ? `\n**Notes:** ${range.description}` : ''}

## Measured Statistics

- **Duration:** ${formatDuration(stats.durationMs)}
- **Energy consumed:** ${roundEnergy(stats.energyWh)} Wh (${(stats.energyWh * pricePerKWh / 1000).toFixed(2)}€)
  - Copy: \`{{ ${roundEnergy(stats.energyWh)} | Wh }}\` or \`{{ ${roundEnergy(stats.energyWh)} | Wh€ }}\`
- **Power:**
  - Median: ${roundPower(stats.medianPowerW)} W → \`{{ ${roundPower(stats.medianPowerW)} | W }}\`
  - Average: ${roundPower(stats.averagePowerW)} W → \`{{ ${roundPower(stats.averagePowerW)} | W }}\`
  - Maximum: ${roundPower(stats.maxPowerW)} W → \`{{ ${roundPower(stats.maxPowerW)} | W }}\`

## Visual Analysis

See the profile screenshot \`${rangeId}.png\` in this directory for the power consumption graph over time.

Look for patterns such as:
- Initial startup spikes
- Stable operation plateaus
- Heating/cooling cycles
- Repeating patterns or cycles
- Idle/standby periods
- Shutdown characteristics
`;

          fs.writeFileSync(path.join(profileDataPath, `${rangeId}.md`), statsMd);
        }

        // Generate template markdown
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const basePath = `draft/${slug}/preview/`;
        const mainImage = `${basePath}images/${slug}.jpg`;

        let template = `---
layout: test-preview-layout.njk
title: ${data.title || 'TODO'}
img: ${mainImage}
date: ${today}
tags: ['test-preview']
isDraft: true
basePath: ${basePath}
---

{% comment %}
PUBLISHING CHECKLIST:
1. Change layout to: test-layout.njk
2. Remove isDraft and basePath
3. Change tags to: ['test']
4. Update existing-tests.md with this entry:

### ${slug}
**Title:** ${data.title || 'TODO'}
**Device:** TODO: Brand and model
**Key findings:**
- TODO: Add 3-5 key findings from the test
- TODO: Include important consumption values
- TODO: Note any surprising or notable observations

{% endcomment %}

TODO: Opening paragraph (1-2 sentences ending with consumption question)

<!-- excerpt -->

{% tldr %}
TODO: Write this LAST after completing all sections
{% endtldr %}

${data.notes ? `{% comment %}\nNotes from draft:\n${data.notes}\n{% endcomment %}\n\n` : ''}## Le matériel

{% intro "${slug}.jpg" "TODO: Device name and model description" %}
TODO: Device description and context

### Méthode de mesure
TODO: Describe measurement equipment and link to article
{% endintro %}

## Consommation

`;

        // Add image references for all defined images (except 'img' which is in intro)
        if (data.images) {
          for (const shortname of Object.keys(data.images)) {
            if (shortname === 'img') continue;
            const imgData = data.images[shortname];
            const filename = `${slug}-${shortname}.jpg`;
            const width = imgData.width || 500;
            template += `{% image "./images/${filename}" "TODO" "${width}w" ${width} %}`;
            if (imgData.description) {
              template += `\n{% comment %}${imgData.description}{% endcomment %}`;
            }
            template += `\n\n`;
          }
        }

        // Add profile range templates
        for (const range of data.ranges) {
          // Escape single quotes in the name for the Liquid shortcode
          const escapedName = range.name.replace(/'/g, "\\'");

          // Get the shortname for this range's profile
          const profileData = profiles[range.file];
          const shortname = profileData?.shortname || 'profile';
          const profileFilename = shortname === 'profile'
            ? `${slug}.json.gz`
            : `${slug}-${shortname}.json.gz`;

          template += `{% profile "${profileFilename}" '{"name": "${escapedName}", "range": "${range.range}"}' %}`;

          // Only add comment if there's an actual description
          if (range.description) {
            template += `\n{% comment %}draft: ${range.description}{% endcomment %}`;
          }

          template += `\n\n`;
        }

        template += `{% plusloin %}
TODO: Suggest 3-5 follow-up investigations
{% endplusloin %}
`;

        // Write template
        const templatePath = path.join(testsPath, `${slug}.md`);
        fs.writeFileSync(templatePath, template);

        // Rebuild the preview
        try {
          await rebuildDraftPreview(slug);
          sendJSON(res, 200, {
            success: true,
            message: 'Template generated successfully',
            claudePrompt: `Generate a test for draft/${slug}. The template is at draft/${slug}/preview/tests/${slug}.md. Profile data with statistics and screenshots are in draft/${slug}/preview/profile-data/. Read draft/CLAUDE-INSTRUCTIONS.md for guidance on how to write tests.`,
            paths: {
              template: `draft/${slug}/preview/tests/${slug}.md`,
              profiles: `draft/${slug}/preview/profiles/`,
              profileData: `draft/${slug}/preview/profile-data/`,
              images: `draft/${slug}/preview/images/`
            },
            testPath: `draft/${slug}/preview/tests/${slug}`
          });
        } catch (buildError) {
          console.error('Build failed:', buildError);
          sendJSON(res, 500, { error: buildError.message });
        }
      } catch (error) {
        console.error('Generate template error:', error);
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // GET /api/draft/:slug/template-exists - Check if template exists
    const templateExists = /^\/api\/draft\/([^/]+)\/template-exists$/;
    if (req.method === 'GET' && templateExists.test(url)) {
      const [, slug] = url.match(templateExists);
      const templatePath = path.join(process.cwd(), 'draft', slug, 'preview', 'tests', `${slug}.md`);
      sendJSON(res, 200, { exists: fs.existsSync(templatePath) });
      return;
    }

    // POST /api/draft/:slug/publish - Publish draft to production
    const publishDraft = /^\/api\/draft\/([^/]+)\/publish$/;
    if (req.method === 'POST' && publishDraft.test(url)) {
      const [, slug] = url.match(publishDraft);

      try {
        const result = await publishDraftToProduction(slug);
        sendJSON(res, 200, result);
      } catch (error) {
        console.error('Publish error:', error);
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    // POST /api/render-profile - Render a profile shortcode
    if (req.method === 'POST' && url === '/api/render-profile') {
      const { profile, options } = req.body || {};

      if (!profile || !options) {
        sendJSON(res, 400, { error: 'Missing profile or options' });
        return;
      }

      try {
        // Create a fake user benchmarks for API calls
        const fakeUserBenchmarks = {
          get: () => ({ before: () => {}, after: () => {} })
        };
        const html = await profileShortcode(profile, options, fakeUserBenchmarks);
        sendJSON(res, 200, { html });
      } catch (error) {
        sendJSON(res, 500, { error: error.message });
      }
      return;
    }

    next();
  });

  // Proxy for Firefox Profiler
  middleware.push(
    createProxyMiddleware({
      pathFilter: function(pathname, req) {
        // Proxy profiler-specific paths
        if (pathname.startsWith('/from-url/')) {
          return true;
        }
        // Proxy profiler assets - Vite-style filenames: name-XXXXXXXX.ext
        // where the hash is 8 uppercase alphanumeric characters
        if (pathname.startsWith('/locales/') ||
            /^\/[\w.-]+-[A-Z0-9]{8}\.(js|css|svg)$/.test(pathname) ||
            pathname.endsWith('.map')) {
          return true;
        }
        return false;
      },
      target: 'http://localhost:4242',
      changeOrigin: true,
      onProxyRes: function(proxyRes, req, res) {
        // Remove CSP headers that might block embedding
        delete proxyRes.headers['content-security-policy'];
        delete proxyRes.headers['x-frame-options'];
      }
    })
  );
}

export default function (eleventyConfig) {
  Profiler(eleventyConfig);
  // Start the category name with a space so it sorts before "Aggregate".
  UserBenchmarks = eleventyConfig.benchmarkManager.get(" User");

  // Parse metadata files to create mock collections
  function parseMetadataFile(filepath, type) {
    if (!fs.existsSync(filepath)) {
      return [];
    }
    const content = fs.readFileSync(filepath, 'utf-8');
    const items = [];
    const sections = content.split(/^### /m).slice(1); // Skip header

    for (const section of sections) {
      const lines = section.trim().split('\n');
      const slug = lines[0].trim();

      // Find title line
      let title = slug;
      for (let i = 1; i < lines.length; i++) {
        const match = lines[i].match(/^\*\*Title:\*\* (.+)$/);
        if (match) {
          title = match[1];
          break;
        }
      }

      // Create mock collection item with minimal required properties for shortcodes
      items.push({
        url: `/${type}/${slug}/`,
        fileSlug: slug,
        data: {
          title,
          pagetitle: type === 'tests' ? `Combien consomme ${title} ?` : title,
          tags: [type]
        }
      });
    }

    return items;
  }

  // Fast preview mode: only build a specific preview directory
  const previewOnly = process.env.ELEVENTY_PREVIEW_ONLY;

  // Validate metadata files are up to date (full build only)
  if (!previewOnly) {
    // Use a collection to validate metadata files during the build
    eleventyConfig.addCollection("_validateMetadata", function(collectionApi) {
      const validations = [
        { tag: 'test', file: 'draft/existing-tests.md', type: 'tests' },
        { tag: 'post', file: 'draft/existing-posts.md', type: 'posts' }
      ];

      for (const { tag, file, type } of validations) {
        const built = collectionApi.getFilteredByTag(tag).map(item => item.fileSlug);
        const inMetadata = parseMetadataFile(file, type).map(item => item.fileSlug);
        const missing = built.filter(slug => !inMetadata.includes(slug));

        if (missing.length > 0) {
          console.error(`\n❌ ERROR: ${file} is missing ${missing.length} ${tag}(s):`);
          missing.forEach(slug => console.error(`  - ${slug}`));
          console.error(`\nPlease add these ${tag}s to ${file} before building.\n`);
          process.exit(1);
        } else {
          console.log(`✅ ${file}: ${built.length} ${tag}s validated`);
        }
      }

      return []; // Return empty collection, we're just using this for validation
    });
  } else {
    // Ignore production content
    ["posts/**", "tests/**", "about.md", "feed.njk", "index.njk", "robots.njk", "sitemap.njk"]
      .forEach(pattern => eleventyConfig.ignores.add(pattern));

    // Ignore draft helper files
    ["draft-pages.njk", "index.njk", "README.md", "existing-tests.md", "existing-posts.md"]
      .forEach(file => eleventyConfig.ignores.add(`draft/${file}`));

    // Ignore all other draft slug directories
    const targetSlug = previewOnly.split('/')[1];
    fs.readdirSync('draft', { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== targetSlug)
      .forEach(dirent => eleventyConfig.ignores.add(`draft/${dirent.name}/**`));

    // Ignore profile-data within the target preview
    eleventyConfig.ignores.add(`${previewOnly}/profile-data/**`);

    // Create collections from metadata files
    const tests = parseMetadataFile('draft/existing-tests.md', 'tests');
    const posts = parseMetadataFile('draft/existing-posts.md', 'posts');

    eleventyConfig.addCollection("test", () => tests);
    eleventyConfig.addCollection("post", () => posts);

    console.log(`[Preview Mode] Only building: ${previewOnly}/tests/**/*.md`);
    console.log(`[Preview Mode] Loaded ${tests.length} tests and ${posts.length} posts from metadata files`);
  }

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("profiles");

  // Draft system (dev mode or preview mode)
  if (isDev || previewOnly) {
    eleventyConfig.addPassthroughCopy("draft/**/*.{jpg,jpeg,png,gif,webp}");
    eleventyConfig.addPassthroughCopy("draft/**/*.json.gz");
    eleventyConfig.addPassthroughCopy("draft/**/*.js");
    eleventyConfig.addPassthroughCopy("draft/**/*.css");
    eleventyConfig.addPassthroughCopy("draft/**/*-test.html");
    // Ignore profile-data markdown files (they're data for Claude, not templates to render)
    eleventyConfig.ignores.add("draft/**/preview/profile-data/**");
    // Ignore Claude helper files (contain example Liquid syntax that shouldn't be parsed)
    eleventyConfig.ignores.add("draft/CLAUDE-INSTRUCTIONS.md");
    eleventyConfig.ignores.add("draft/CLAUDE-VERIFICATION.md");
    // Ignore data.json files from watch (they change frequently via API and shouldn't trigger rebuilds)
    eleventyConfig.watchIgnores.add("draft/**/data.json");
    // Ignore profile-data folder from watch (reference data for Claude, not templates)
    eleventyConfig.watchIgnores.add("draft/**/preview/profile-data/**");
  } else {
    eleventyConfig.ignores.add("draft/**");
  }

  eleventyConfig.addCollection("testsAndPosts", function testsAndPostsCollection(collectionApi) {
    return collectionApi.getFilteredByGlob(["posts/*.md", "tests/*.md"]);
  });

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(timeToRead, {language: 'fr'});

  const cssPath = "_includes/theme.css";
  let _fullCss = null;
  let _cssMtime = 0;
  function getFullCss() {
    const mtime = fs.statSync(cssPath).mtimeMs;
    if (!_fullCss || mtime !== _cssMtime) {
      _fullCss = fs.readFileSync(cssPath, { encoding: "utf-8" });
      _cssMtime = mtime;
    }
    return _fullCss;
  }
  eleventyConfig.addTransform("htmlmin", async function htmlMinTransform(content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      const b = UserBenchmarks.get("> htmlmin > " + this.page.outputPath);
      b.before();
      const fullCss = getFullCss();

      // Apply typographic replacements to all HTML pages
      content = content.replace(/ ([!?:;»])/g, nbsp + "$1")
        .replace(/« /g, "«" + nbsp)
        .replace(/([^-].)'/g, "$1’") // avoid replacing ' in urls where spaces are replaced with -.
        .replace(/oe/g, "œ")
        .replace(/\.\.\./g, "…");

      // Skip CSS minification for draft pages (they have dynamically inserted content)
      // and include the full CSS.
      if (this.page.outputPath.includes('/draft/')) {
        content = content.replace("</head>", `<style>${fullCss}</style></head>`);
        b.after();
        return content;
      }

      let bCss = UserBenchmarks.get("> htmlmin > PurgeCSS: " + this.page.outputPath);
      bCss.before();

      let purgeResult = await new PurgeCSS().purge({
        extractors: [
          {
            extractor: purgeHtml,
            extensions: ["html"],
          },
        ],
        content: [
          {
            raw: content,
            extension: "html",
          },
        ],
        css: [
          {
            raw: fullCss,
          },
        ],
      });
      bCss.after();

      const cleanCss = new CleanCSS({}).minify(purgeResult[0].css).styles;
      content = content.replace("</head>", `<style>${cleanCss}</style></head>`);

      if (!process.env.NO_MINIFY) {
        content = htmlmin.minify(content, {
          removeComments: true,
          collapseWhitespace: true,
        });
      }

      b.after();
    }

    return content;
  });

  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter('trim', string => {
    return string.trim();
  });

  eleventyConfig.addFilter('stripTestPostLinks', string => {
    // Replace {% test slug description %} with just 'description'
    // Replace {% post slug description %} with just 'description'
    // Match the closing %} specifically to handle % in descriptions
    return string.replace(/\{%\s*(test|post)\s+(\S+)\s+(.*?)\s*%\}/g, '$3');
  });

  eleventyConfig.addAsyncFilter('renderString', async function(str) {
    // Rendre une chaîne Liquid avec le contexte des collections
    const { Liquid } = await import('liquidjs');
    const liquid = new Liquid();

    // Helper pour créer un tag test/post qui génère du HTML
    const createLinkTag = (collectionName) => ({
      parse(tagToken) {
        let input = tagToken.args;
        let index = input.indexOf(" ");
        if (index != -1) {
          this.slug = input.slice(0, index);
          this.label = input.slice(index + 1);
        } else {
          this.slug = input;
        }
      },
      render(ctx) {
        const collection = ctx.environments.collections[collectionName];
        const item = collection.find(t => t.fileSlug == this.slug);
        if (!item) {
          throw new Error(`No ${this.slug} ${collectionName}`);
        }
        if (this.label) {
          // Générer du HTML au lieu de Markdown
          return `<a href="${item.url}" title="${item.data.pagetitle}">${this.label}</a>`;
        }
        return item.url;
      }
    });

    liquid.registerTag('test', createLinkTag('test'));
    liquid.registerTag('post', createLinkTag('post'));

    try {
      return await liquid.parseAndRender(str, this.ctx);
    } catch (error) {
      console.error('Error rendering string:', error);
      return str;
    }
  });

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("jsmin", function jsmin(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }

    return minified.code;
  });

  eleventyConfig.addFilter('profilerLink', profilerLink);

  eleventyConfig.addFilter('percent', function(val1, val2) {
    return Math.round(val1 / val2 * 100) + "%";
  });
  eleventyConfig.addFilter('percentMore', function(val1, val2) {
    return Math.round((val1 / val2 - 1) * 100) + "%";
  });
  eleventyConfig.addFilter('percentLess', function(val1, val2) {
    return Math.round((val1 / val2 - 1) * -100) + "%";
  });

  const daysPerYear = 365.2425;
  eleventyConfig.addFilter('s', s => formatDuration(s * 1000));
  eleventyConfig.addFilter('€', formatEuro);
  eleventyConfig.addFilter('V', formatVoltage);
  eleventyConfig.addFilter('W', formatPower);
  eleventyConfig.addFilter('VA', powerVA =>
    formatPower(powerVA).replace("W", "VA"));
  eleventyConfig.addFilter('Wh', formatEnergy);
  eleventyConfig.addFilter('PerYear', WhPerDay =>
    WhPerDay * daysPerYear);
  eleventyConfig.addFilter('PerMonth', WhPerDay =>
    WhPerDay * daysPerYear / 12);
  eleventyConfig.addFilter('W€PerYear', powerW =>
    formatEnergyCost(powerW * 24 * daysPerYear));
  eleventyConfig.addFilter('W€PerMonth', powerW =>
    formatEnergyCost(powerW * 24 * daysPerYear / 12));
  eleventyConfig.addFilter('W€PerDay', powerW =>
    formatEnergyCost(powerW * 24));
  eleventyConfig.addFilter('Wh€PerYear', energyWhPerDay =>
    formatEnergyCost(energyWhPerDay * daysPerYear));
  eleventyConfig.addFilter('Wh€PerMonth', energyWhPerDay =>
    formatEnergyCost(energyWhPerDay * daysPerYear / 12));
  eleventyConfig.addFilter('Wh€', formatEnergyCost);
  eleventyConfig.addFilter('countPer€', function(energyWh, euro = 1) {
    return Math.round(euro / (energyWh / 1000 * pricePerKWh)).toLocaleString("fr-FR");
  });
  eleventyConfig.addFilter('countHPer€', function(energyWh, euro = 1) {
    return formatDuration(euro / (energyWh / 1000 * pricePerKWh) * 3600 * 1000);
  });

  // Used for meta og:image and twitter:image
  eleventyConfig.addShortcode("img", async function(src) {
    const b = UserBenchmarks.get("> img > " + src);
    b.before();

    const imageOptions = {
      formats: ["jpeg"],
      outputDir: "./_site/img/",
      widths: [800],
    };

    // If src includes a path separator, use as-is, otherwise prepend ./images/
    const imgPath = src.includes('/') ? src : "./images/" + src;
    let metadata = await Image(imgPath, imageOptions);

    b.after();
    return metadata.jpeg[0].url;
  });

  eleventyConfig.addShortcode("image", async function(src, alt, sizes, width, lazy = true) {
    const basePath = this.ctx?.environments?.basePath;

    // If basePath exists and src is relative (not absolute path, not http), prepend basePath
    if (basePath && !src.startsWith('/') && !src.startsWith('http')) {
      src = basePath + src;
    }

    return image(src, alt, sizes, width, lazy);
  });

  eleventyConfig.addPairedShortcode("intro", async function(content, filename, alt) {
    const basePath = this.ctx?.environments?.basePath || './';
    const imgPath = basePath + 'images/' + filename;

    let img = await image(imgPath, alt, "512w", 512, false);
    return `<div id="intro"><div>${content}</div>${img}</div>`;
  });

  eleventyConfig.addPairedShortcode("tldr", function(content, title="En résumé") {
    return `<div id="tldr"><h2>${title}</h2>\n${content}</div>`;
  });

  eleventyConfig.addPairedShortcode("plusloin", function(content, title="Pour aller plus loin") {
    return `<div id="plusloin"><h2>${title}</h2>\n${content}</div>`;
  });

  eleventyConfig.addLiquidTag("test", function (liquidEngine) {
    return {
      parse(tagToken, remainingTokens = []) {
        let input = tagToken.args;
        let index = input.indexOf(" ");
        if (index != -1) {
          this.slug = input.slice(0, index);
          this.label = input.slice(index + 1);
        } else {
          this.slug = input;
        }
      },
      async render(ctx) {
        const tests = ctx.environments.collections.test;
        const test = tests.find(t => t.fileSlug == this.slug);
        if (!test) {
          throw new Error(`No ${this.slug} test`);
        }
        if (this.label) {
          return `[${this.label}](${test.url} "${test.data.pagetitle}")`;
        }

        return test.url;
      },
    };
  });

  eleventyConfig.addLiquidTag("post", function (liquidEngine) {
    return {
      parse(tagToken, remainingTokens = []) {
        let input = tagToken.args;
        let index = input.indexOf(" ");
        if (index != -1) {
          this.slug = input.slice(0, index);
          this.label = input.slice(index + 1);
        } else {
          this.slug = input;
        }
      },
      async render(ctx) {
        const posts = ctx.environments.collections.post;
        const post = posts.find(t => t.fileSlug == this.slug);
        if (!post) {
          throw new Error(`No ${this.slug} article`);
        }
        if (this.label) {
          return `[${this.label}](${post.url} "${post.data.pagetitle}")`;
        }

        return post.url;
      },
    };
  });

  eleventyConfig.addShortcode("profile", async function(profile, options) {
    const basePath = this.ctx?.environments?.basePath;

    // If basePath exists and no path in options, add it
    if (basePath && options) {
      const opts = JSON.parse(options);
      if (!opts.path) {
        opts.path = basePath + 'profiles/';
        options = JSON.stringify(opts);
      }
    }

    return await profileShortcode(profile, options, UserBenchmarks);
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->"
  });

  const middleware = [
    function (req, res, next) {
      if (/\/(profiles|draft)\/.*\.json\.gz$/.test(req.url)) {
        res.setHeader('access-control-allow-origin', '*');
      }
      next();
    }
  ];

  // Setup dev mode middleware (draft API, profiler proxy)
  if (isDev) {
    setupDevMiddleware(middleware);
  }

  eleventyConfig.setServerOptions({
    middleware,
  });
}
