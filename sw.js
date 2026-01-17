const CACHE_NAME = 'storylines-v63-offline'; // Increment version to force update
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './parchtitle.png',
  // Fonts - Ensure these paths match exactly where the files are served
  './merriweather-light.woff2',
  './merriweather-regular.woff2',
  './merriweather-bold.woff2',
  './merriweather-black.woff2',
  // External Libraries - Caching these requires they support CORS or we handle opaque responses
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
  'https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js'
];

// Install: Cache core assets
self.addEventListener('install', (event) => {
  // Force this new service worker to become the active one, bypassing the "waiting" state
  // self.skipWaiting(); // Removed to allow user-triggered updates
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(ASSETS);
    })
  );
});

// Listen for skipWaiting message from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Activate: Clean up old caches and take control of clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // Tell the service worker to take control of all open clients (tabs) immediately
  return self.clients.claim();
});

// Fetch: Network First for HTML (to get updates), Cache First for assets
// Or simpler: Cache First, falling back to Network (Stale-While-Revalidate is best for apps like this)
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests like Google Analytics or things we don't want to cache logic for simplicity
  if (event.request.method !== 'GET') return;

  // Network First for HTML (navigation) to ensure updates are seen immediately
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not in cache, fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          // Note: External scripts (like Firebase/Marked) might be 'cors' or 'opaque'. 
          // 'basic' means same-origin. We generally only want to cache our own assets dynamically
          // unless we are sure. For now, let's allow it but be careful.
          
          // Allow caching of specific external CDNs we trust
          const url = new URL(event.request.url);
          const isAllowedExternal = ASSETS.some(asset => asset.startsWith('http') && event.request.url.includes(asset));
          
          if (networkResponse.type !== 'basic' && !isAllowedExternal) {
              return networkResponse;
          }
        }

        // Clone the response because it's a stream and can only be consumed once
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Optional: Return a custom offline page if navigation fails
        // if (event.request.mode === 'navigate') {
        //   return caches.match('./offline.html');
        // }
      });
    })
  );
});
