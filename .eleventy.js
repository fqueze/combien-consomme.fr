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
  if (powerW < 1 && powerW > 0) {
    return toPrecisionIfNotInt(powerW * 1000) + nbsp + "mW";
  }

  if (powerW > 1000) {
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

  let durationMs = Math.min(end, time(lastSample)) - time(firstSample);
  let energyWh = samples.count.slice(firstSample, lastSample + 1).reduce(function sampleReducer(acc, val) {
    return acc + val;
  }) / 1e12;

  let stats = {
    durationMs, energyWh,
    medianPowerW: powerValues[Math.floor(powerValues.length / 2)],
    maxPowerW: powerValues[powerValues.length - 1],
    averagePowerW: energyWh / (durationMs / 3600000)
  };

  b.after();
  return {stats, firstSample, lastSample, values};
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
    let {stats, firstSample, lastSample, values} =
      getStatsFromCounterSamples(profileStringId, {meta}, samples, options.range, multiCounters);
    if (options.debug) {
      console.log(profile, options, stats);
    }
    if (values.length == 0) {
      throw new Error(`No sample in range, profile: ${profile}, options=${JSON.stringify(options)}`);
    }
    let graph = values.map(function xAndYFromValues(v, i) {
      return ({
        x: (samples.time[firstSample + i] - samples.time[firstSample]) / stats.durationMs,
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

function setupDevMiddleware(middleware) {
  // Helper functions for API responses
  function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

  function loadDraftData(slug) {
    const dataPath = `./draft/${slug}/data.json`;

    if (fs.existsSync(dataPath)) {
      try {
        return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      } catch (error) {
        // Invalid JSON, fall through to default
      }
    }

    return { ranges: [], title: null };
  }

  function saveDraftData(slug, data) {
    const dataPath = `./draft/${slug}/data.json`;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
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

  // Serve draft files directly from draft folder (including preview subfolder)
  middleware.push(function(req, res, next) {
    const draftFileMatch = req.url.match(/^\/draft\/([^/]+)\/(preview\/)?(.+\.(jpg|jpeg|png|gif|webp|json\.gz|js))(?:\?.*)?$/);
    if (draftFileMatch) {
      const [, slug, previewPath, filename] = draftFileMatch;
      const filePath = path.join(process.cwd(), 'draft', slug, previewPath || '', filename);

      if (fs.existsSync(filePath)) {
        const ext = path.extname(filename).toLowerCase();
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
      const { profileName, range, name, file, shortcode } = req.body || {};

      if (!profileName || !name) {
        sendJSON(res, 400, { error: 'Missing required fields' });
        return;
      }

      const data = loadDraftData(slug);
      if (!data.ranges) {
        data.ranges = [];
      }

      const id = Date.now().toString();
      data.ranges.push({ id, profileName, range, name, file, shortcode });

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

        // Create preview subfolder if it doesn't exist
        const previewPath = path.join(draftPath, 'preview');
        if (!fs.existsSync(previewPath)) {
          fs.mkdirSync(previewPath, { recursive: true });
        }

        // Save as slug.jpg for 'img' (thumbnail), or slug-shortname.jpg for other shortnames
        const newFilename = shortname === 'img' ? `${slug}.jpg` : `${slug}-${shortname}.jpg`;
        const imagePath = path.join(previewPath, newFilename);

        // Write the new image file
        fs.writeFileSync(imagePath, imageBuffer);

        sendJSON(res, 200, { success: true, previewFilename: `preview/${newFilename}` });
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
          const previewPath = path.join(draftPath, 'preview');

          // Preview filename: special case for 'img' (thumbnail)
          const previewFilename = shortname === 'img' ? `${slug}.jpg` : `${slug}-${shortname}.jpg`;
          const previewFilePath = path.join(previewPath, previewFilename);

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
        // Proxy profiler assets - these patterns are specific to Firefox Profiler
        // and shouldn't conflict with the site's own assets
        if (pathname.endsWith('.bundle.js') ||
            pathname.startsWith('/locales/') ||
            /^\/[a-f0-9]{20}\.(jpg|png|svg|css|wasm)$/.test(pathname) ||
            /^\/[a-f0-9]{32}\.js$/.test(pathname) ||
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

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("profiles");

  // Draft system (dev mode only)
  if (isDev) {
    eleventyConfig.addPassthroughCopy("draft/**/*.{jpg,jpeg,png,gif,webp}");
    eleventyConfig.addPassthroughCopy("draft/**/*.json.gz");
    eleventyConfig.addPassthroughCopy("draft/**/*.js");
  } else {
    eleventyConfig.ignores.add("draft/**");
  }

  eleventyConfig.addCollection("testsAndPosts", function testsAndPostsCollection(collectionApi) {
    return collectionApi.getFilteredByGlob(["posts/*.md", "tests/*.md"]);
  });

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(timeToRead, {language: 'fr'});

  const fullCss = fs.readFileSync("_includes/theme.css", {
    encoding: "utf-8",
  });
  eleventyConfig.addTransform("htmlmin", async function htmlMinTransform(content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      // Skip CSS minification for draft pages (they have dynamically inserted content)
      // and include the full CSS.
      if (this.page.outputPath.includes('/draft/')) {
        content = content.replace("</head>", `<style>${fullCss}</style></head>`);
        return content;
      }

      const b = UserBenchmarks.get("> htmlmin > " + this.page.outputPath);
      b.before();

      content = content.replace(/ ([!?:;»])/g, nbsp + "$1")
        .replace(/« /g, "«" + nbsp)
        .replace(/([^-].)'/g, "$1’") // avoid replacing ' in urls where spaces are replaced with -.
        .replace(/oe/g, "œ")
        .replace(/\.\.\./g, "…");

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

    let metadata = await Image("./images/" + src, imageOptions);

    b.after();
    return metadata.jpeg[0].url;
  });

  eleventyConfig.addShortcode("image", async function(src, alt, sizes, width, lazy = true) {
    return image(src, alt, sizes, width, lazy);
  });

  eleventyConfig.addPairedShortcode("intro", async function(content, filename, alt) {
    let img = await image("./images/" + filename, alt, "512w", 512, false);
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
