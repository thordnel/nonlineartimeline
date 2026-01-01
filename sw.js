const CACHE_NAME = 'storylines-v3';
const ASSETS = [
  './index.html',
  './manifest.json',
  './parchtitle.png',
  './merriweather-light.woff2',
  './merriweather-regular.woff2',
  './merriweather-bold.woff2',
  './merriweather-black.woff2',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'
];

// Install: Cache all core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

// Fetch: Serve from cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached asset if found
      if (response) return response;

      // Otherwise fetch from network
      return fetch(event.request).then((fetchRes) => {
        // Only cache successful GET requests for local assets
        if (event.request.method === 'GET' && fetchRes.status === 200) {
           const copy = fetchRes.clone();
           caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return fetchRes;
      });
    }).catch(() => {
      // Offline fallback can be added here if needed
    })
  );
});
