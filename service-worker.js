self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('vibecoding-v1').then(cache =>
      cache.addAll([
        '/index.html',
        '/main.js',
        '/audio1.mp3',
        '/audio2.mp3',
        '/audio3.mp3',
        '/audio4.mp3',
        '/icon-192.png',
        '/icon-512.png'
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
