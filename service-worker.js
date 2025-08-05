self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('vibecoding-v1').then(cache => {
      return cache.addAll([
        '/index.html',
        '/main.js',
        '/audio1.mp3',
        '/audio2.mp3',
        '/audio3.mp3',
        '/audio4.mp3',
        '/icon-192.png',
        '/icon-512.png'
      ]).then(() => {
        console.log('Resources cached');
      }).catch(err => {
        console.error('Error caching resources:', err);
      });
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      if (resp) {
        console.log('Serving from cache:', event.request.url);
        return resp;
      }

      // Fai una richiesta di rete se la risorsa non è in cache
      console.log('Fetching from network:', event.request.url);
      return fetch(event.request).then(networkResponse => {
        return caches.open('vibecoding-v1').then(cache => {
          // Aggiungi la risposta alla cache per usi futuri
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
