const CACHE_NAME = 'pupaSv-v1';
const API_CACHE_NAME = 'pupaSv-api-v1'; // Un caché separado para las API
const OFFLINE_URL = '/offline.html';

const PRECACHE_URLS = [
    '/',
    'boundary/views/index.html',
    'boundary/views/carrito.html',
    'boundary/views/menu.html',
    'boundary/views/sucursales.html',
    'boundary/api/AbstractApi.js',
    'boundary/api/CarritoApi.js',
    'boundary/api/ComboApi.js',
    'boundary/api/ProductoApi.js',
    'boundary/styles/style.css',
    'boundary/viewBuilders/CarritoViewBuilder.js',
    'boundary/viewBuilders/ProductoViewBuilder.js',
    'control/utils/CalcularPrecio.js',
    'control/utils/CarritoStore.js',
    'control/utils/Modal.js',
    'resources/icons/icon_512.png',
    'resources/icons/icon_192.png',
    'resources/icons/icon_120.png',
    'resources/icons/icon_60.png',
    'resources/icons/icon_57.png',
    'resources/images/2505202500.png',
    'resources/images/2505202501.png',
    'resources/images/2505202502.png',
    'resources/images/2505202503.png',
    'resources/images/istockphoto-991599660-612x612.jpg',
    'resources/images/pupas-logo.png',
    'resources/images/pupusas-gourmet.jpg',
    'entity/CarritoItem.js',
    'entity/Carrito.js',
    'control/mappers/CarritoMapper.js',
    'manifest.json',
    'app.js',
    
];

self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME)
          .then(cache => cache.addAll(PRECACHE_URLS))
          .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(cacheName => {
                  if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
                      return caches.delete(cacheName);
                  }
              })
          );
      }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  
  // Para archivos estáticos (JS, CSS)
  if (requestUrl.pathname.endsWith('.js') || requestUrl.pathname.endsWith('.css')) {
      event.respondWith(
          caches.match(requestUrl.pathname, { ignoreSearch: true })
              .then(cached => cached || fetch(event.request))
      );
      return;
  }
  
  // Para APIs
  if (requestUrl.pathname.includes('/PupaSV-1.0-SNAPSHOT/v1/')) {
      event.respondWith(
          caches.open(API_CACHE_NAME).then(cache => {
              return fetch(event.request)
                  .then(response => {
                      if (response.ok) {
                          const clone = response.clone();
                          cache.put(event.request, clone);
                      }
                      return response;
                  })
                  .catch(() => {
                      return cache.match(event.request)
                          .then(cached => cached || new Response(
                              JSON.stringify({ error: "No connection" }), 
                              { 
                                  status: 503,
                                  statusText: 'Service Unavailable',
                                  headers: { 'Content-Type': 'application/json' }
                              }
                          ));
                  });
          })
      );
      return;
  }
  
  // a otros recursos
  event.respondWith(
      caches.match(event.request)
          .then(cached => cached || fetch(event.request))
  );
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});


// Manejo de clics en notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow(event.notification.data.url);
    })
  );
});