const isDev = process.env.ELEVENTY_ENV === 'dev';

module.exports = function () {
  return {
    url: isDev ? 'http://localhost:8080' : 'https://combien-consomme.fr',
    profilerUrl: isDev ? 'http://localhost:4242' : 'https://profiler.firefox.com',
  };
};
