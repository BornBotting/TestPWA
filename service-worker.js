const CACHE_NAME = 'vibecoding-v3';
const FILES_TO_CACHE = [
  '/index.html',
  '/main.js',
  '/audio1.mp3',
  '/audio2.mp3',
  '/audio3.mp3',
  '/audio4.mp3',
  '/icon-192.png',
  '/icon-512.png'
];

// Installazione → pre-caching
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE).then(() => {
        console.log('[ServiceWorker] Resources cached');
      }).catch(err => {
        console.error('[ServiceWorker] Error caching resources:', err);
      });
    })
  );
  self.skipWaiting(); // Prende il controllo subito
});

// Attivazione → elimina vecchie cache
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Controlla subito tutte le pagine
});

// Intercetta fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      if (resp) {
        console.log('[ServiceWorker] Serving from cache:', event.request.url);
        return resp;
      }

      console.log('[ServiceWorker] Fetching from network:', event.request.url);
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          // Salva nella cache per la prossima volta
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(error => {
        console.error('[ServiceWorker] Network error:', error);
        throw error;
      });
    })
  );
});
