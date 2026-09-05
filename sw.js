/* =============================================
   LEXCAMPUS — Service Worker (Offline Support)
   ============================================= */

const CACHE_NAME = 'lexcampus-v5';

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data/maxims.js',
  './data/dictionary.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './manifest.json'
];

// Install — cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean up old caches immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — Network-first for dynamic scripts/pages, cache-first for static media
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Never cache API requests
  if (url.includes('/api/')) {
    return;
  }

  // Network-first for scripts, HTML, CSS so updates load immediately
  if (event.request.mode === 'navigate' || url.endsWith('.js') || url.endsWith('.css') || url.includes('?v=')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for images, fonts, icons
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
