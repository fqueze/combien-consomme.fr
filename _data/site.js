const isDev = process.env.ELEVENTY_ENV === 'dev';

export default function () {
  return {
    url: isDev ? 'http://localhost:8080' : 'https://combien-consomme.fr',
    profilerUrl: isDev ? 'http://localhost:4242' : 'https://profiler.firefox.com',
    language: "fr",
    isDev,
  };
}
