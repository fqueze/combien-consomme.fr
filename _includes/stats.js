let l = document.location, r = document.referrer;
if (r.startsWith(l.origin)) {
  r = r.slice(l.origin.length);
}
fetch(`https://s.combien-consomme.fr/?l=${encodeURIComponent(l.pathname)}&r=${encodeURIComponent(r)}`);
