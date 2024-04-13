const moment = require('moment');

const fs = require("fs");
const zlib = require('zlib');
const {parser} = require('stream-json');
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const Image = require("@11ty/eleventy-img");

const isDev = process.env.ELEVENTY_ENV === 'dev';
const baseUrl = isDev ? 'http://localhost:8080' : 'https://combien-consomme.fr';
const profilerUrl = isDev ? 'http://localhost:4242' : 'https://profiler.firefox.com'

moment.locale('fr');

const pricePerKWh = 0.2516; // EDF option Base, Février 2024
const priceTooltip = `Tarif EDF option Base (Février 2024), ${pricePerKWh} € TTC par kWh`;

const nbsp = "&nbsp;";

function formatDuration(timeMs) {
  let result = "";
  let timeS = timeMs / 1000;
  if (timeS > 60) {
    result = Math.round(timeS % 60) + "s";
    let timeMin = Math.floor(timeS / 60);
    if (timeMin > 60) {
      result = Math.floor(timeMin / 60) + "h" + (timeMin % 60) + "min";
    } else {
      result = timeMin + "min" + result;
    }
  } else {
    result = Math.round(timeS) + "s";
  }

  return result;
}

function toPrecisionIfNotInt(number) {
  return Math.round(number) == number ? number : number.toPrecision(3);
}

function formatPower(powerW) {
  if (powerW > 1000) {
    return toPrecisionIfNotInt(powerW / 1000) + nbsp + "kW";
  }

  return toPrecisionIfNotInt(powerW) + nbsp + "W";
}

function formatEnergy(energyWh) {
  if (energyWh > 1000) {
    return toPrecisionIfNotInt(energyWh / 1000) + nbsp + "kWh";
  }

  return toPrecisionIfNotInt(energyWh) + nbsp + "Wh";
}

function formatCost(energyWh) {
  let costEuro = energyWh * pricePerKWh / 1000;
  let formattedValue = costEuro < 1 ?
      (costEuro * 100).toFixed(2) + nbsp + "c€"
    : costEuro.toFixed(2) + nbsp + "€";
  return `<span title="${priceTooltip}">${formattedValue}</span>`;
}

async function loadProfile(profile) {
  function streamToString (stream) {
    const buffers = [];
    return new Promise((resolve, reject) => {
      stream.on('data', data => buffers.push(data));
      stream.on('error', err => reject(err));
      stream.on('end', () => resolve(Buffer.concat(buffers).toString('utf8')));
    });
  }
  return JSON.parse(await streamToString(fs.createReadStream('./profiles/' + profile)
                                           .pipe(zlib.createGunzip())));
}

function getStatsFromCounterSamples(profile, samples, range = "", keepAllSamples = false) {
  const profilingStartTime = profile.meta.profilingStartTime || 0;
  function time(i) {
    return Math.max(0, samples.time[i] - profilingStartTime);
  }
  
  let powerValues = [];
  let firstSample = 0, lastSample = 0;
  let start = -Infinity;
  let end = Infinity;
  if (range) {
    [v1, v2] = range.split("m");
    if (v1) {
      start = parseInt(v1);
    }
    if (v2) {
      end = (v1 ? parseInt(v1) : 0) + parseInt(v2);
    }
  }

  for (let i = 0; i < samples.length; ++i) {
    if (time(i) < start) {
      continue;
    }
    if (time(i) > end) {
      if (powerValues[powerValues.length - 1] == 0) {
        // If the last sample was 0W, continue drawing until  the end of the specified range.
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
    power = Math.round(samples.count[i] / ((i == 0 ? profile.meta.interval : (samples.time[i] - samples.time[i - 1])) / 3600)) / 1e9;
    powerValues.push(power);
  }

  // Remove trailing 0s that could affect the median.
  if (end === Infinity && lastSample < samples.length - 1 && !keepAllSamples) {
    let removeCount = samples.length - 1 - lastSample;
    powerValues.splice(-removeCount, removeCount);
  }
  let values = powerValues.slice();
  powerValues.sort((a, b) => a - b);

  let durationMs = Math.min(end, time(lastSample)) - time(firstSample);
  let energyWh = samples.count.slice(firstSample, lastSample + 1).reduce((acc, val) => acc + val) / 1e12;
  let stats = {
    durationMs, energyWh,
    medianPowerW: powerValues[Math.floor(powerValues.length / 2)],
    maxPowerW: powerValues[powerValues.length - 1],
    averagePowerW: energyWh / (durationMs / 3600000)
  };
  return {stats, firstSample, lastSample, values};
}

function profilerLink(profile) {
  return profilerUrl + "/from-url/" + encodeURIComponent(new URL("profiles/" + profile, baseUrl).href);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("profiles");

  eleventyConfig.addTransform("htmlmin", function (content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
	removeComments: true,
	collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addTransform("nbsp", function (content) {
    return content.replace(/ ([?:;])/g, nbsp + "$1");
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

  eleventyConfig.addFilter('profilerLink', profilerLink);

  eleventyConfig.addFilter('energy', formatEnergy);
  eleventyConfig.addFilter('power', formatPower);
  eleventyConfig.addFilter('energyCostPerYear', function(energyWhPerDay) {
    let energyWh = energyWhPerDay * 365.25;
    return `${formatEnergy(energyWh)} (${formatCost(energyWh)})`;
  });
  eleventyConfig.addFilter('energyCostPerMonth', function(energyWhPerDay) {
    let energyWh = energyWhPerDay * 365.25 / 12;
    return `${formatEnergy(energyWh)} (${formatCost(energyWh)})`;
  });
  eleventyConfig.addFilter('energyCost', function(energyWh) {
    return `${formatEnergy(energyWh)} (${formatCost(energyWh)})`;
  });

  eleventyConfig.addShortcode("image", async function(src, alt, sizes, width) {
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
      loading: "lazy",
      decoding: "async",
    };

    // You bet we throw an error on a missing alt (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  });

  eleventyConfig.addShortcode("profile", async function(profile, options) {
    options = options ? JSON.parse(options) : {};
    const graphHeight = 120;
    const graphWidth = 2400;
    const halfStrokeWidth = 3;
    function makeSVGPath(graph) {
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

      return path;
    }      

    let {counters, meta} = await loadProfile(profile);
 
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
    const profilerIcon = `<a class="profiler-link" target="_blank" title="Ouvrir dans le Firefox Profiler" href="${profilerLink(profile)}${profilerQuery}"></a>`;

    let result = "";
    let multiCounters = counters.length > 1;
    if (multiCounters) {
      result += `<div class="profile">`
    }
    for (let {name, description, samples} of counters) {
      let {stats, firstSample, lastSample, values} = getStatsFromCounterSamples({meta}, samples, options.range, multiCounters);
      if (options.debug) {
        console.log(profile, options, stats);
      }
      if (values.length == 0) {
        throw new Error(`No sample in range, profile: ${profile}, options=${JSON.stringify(options)}`);
      }
      let graph = values.map((v, i) => ({
        x: (samples.time[firstSample + i] - samples.time[firstSample]) / stats.durationMs,
        y: v / stats.maxPowerW}));
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
        + `</div>`
        + `<table>
<tr><th>Consommation</th><td>${formatEnergy(stats.energyWh)} — ${formatCost(stats.energyWh)}</td></tr>
<tr><th>Durée</th><td>${formatDuration(stats.durationMs)}</td></tr>
</table>
<table class="power">
<tr><th rowspan="2">Puissance</th><td>médiane</td><td>moyenne</td><td>maximale</td></tr>
<tr><td>${formatPower(stats.medianPowerW)}</td><td>${formatPower(stats.averagePowerW)}</td><td>${formatPower(stats.maxPowerW)}</td></tr>
</table>`;
    }
    if (multiCounters) {
      result += options.name ?
          `<p>${options.name}${profilerIcon}</p>`
        : `<p>${counters.length} enregistrements.${profilerIcon}</p>`;
      result += `</div>`;
    }

    return result;
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->"
  });

  eleventyConfig.setServerOptions({
    middleware: [function (req, res, next) {
      if (/\/profiles\/.*\.json.gz$/.test(req.url)) {
        res.setHeader('access-control-allow-origin', '*');
      }
      next();
    }],
  });
};