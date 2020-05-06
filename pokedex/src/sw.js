const _CACHE = {
    dynamicApp: { cacheName: 'poke-dynamic-app', regExp: /\.(?:html|htm|js|css)$/ },
    getAPI: { cacheName: 'poke-get-API', regExp: /pokeapi.co\/api\/v2/ , channelName: 'DATA_UPDATED'},
    imageCache: { cacheName: 'poke-images', regExp: /\.(?:png|gif|jpg|jpeg|svg)/ },
    fontCache: { cacheName: 'poke-fonts', regExp: /\.(?:woff|woff2|eot|ttf|svg)/ },
    defaultCache: { cacheName: 'poke-default' }
}

self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(_ => Promise.all(_.filter(_ => true).map(_ => caches.delete(_))))); });

  
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js');
  
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
  
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST); //injectManifest
  
  workbox.routing.setDefaultHandler(new workbox.strategies.CacheFirst());
  
  workbox.routing.registerRoute(
    _CACHE.dynamicApp.regExp,
    new workbox.strategies.CacheFirst({
      networkTimeoutSeconds: 5,
      cacheName: _CACHE.dynamicApp.cacheName,
      plugins: [
        new workbox.expiration.Plugin({
          // Cache files for 7 day
          maxAgeSeconds: 7 * 24 * 60 * 60,
          // Only cache 30 files.
          maxEntries: 30,
        })
      ],
    })
  );
  
  workbox.routing.registerRoute(
    _CACHE.getAPI.regExp,
    new workbox.strategies.CacheFirst({
      networkTimeoutSeconds: 5,
      cacheName: _CACHE.getAPI.cacheName,
      plugins: [
        new workbox.expiration.Plugin({
          // Cache files for 7 days
          maxAgeSeconds: 7 * 24 * 60 * 60,
          // Only cache 30 responses.
          maxEntries: 30,
        })
      ],
    })
  );
  
  workbox.routing.registerRoute(
    _CACHE.imageCache.regExp,
    new workbox.strategies.CacheFirst({
      cacheName: _CACHE.imageCache.cacheName,
      plugins: [
        new workbox.expiration.Plugin({
          // Cache images for 3 days
          maxAgeSeconds: 7 * 24 * 60 * 60,
          // Only cache 60 images.
          maxEntries: 60
        }),
      ],
    })
  );
  
  workbox.routing.registerRoute(
    _CACHE.fontCache.regExp,
    new workbox.strategies.CacheFirst({
      cacheName: _CACHE.fontCache.cacheName,
      plugins: [
        new workbox.expiration.Plugin({
          // Cache images for 3 days
          maxAgeSeconds: 7 * 24 * 60 * 60,
          // Only cache 60 Fonts.
          maxEntries: 60
        }),
      ],
    })
  );
  
  