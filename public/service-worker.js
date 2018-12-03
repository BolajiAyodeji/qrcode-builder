var dataCacheName = 'qrcode-builder';
var cacheName = 'qrcode-builder';
var filesToCache = [
  '/',
  "./favicon.ico",
  "./images",
  "./images/icons",
  "./images/icons/icon-128x128.png",
  "./images/icons/icon-144x144.png",
  "./images/icons/icon-152x152.png",
  "./images/icons/icon-192x192.png",
  "./images/icons/icon-256x256.png",
  "./index.html",
  "./manifest.json",
  "./js",
  "./js/app.js",
  "./js/jquery-3.3.1.js",
  "./js/jquery.qrcode.min.js",
  "./service-worker.js",
  "./css",
  "./css/app.css",
  "/https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
  "/https://platform.twitter.com/widgets.js",
  "/https://www.facebook.com/plugins/share_button.php",
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
