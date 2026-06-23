// Service Worker para RESOLVITOhabana - v2
const CACHE_NAME = 'resolvitohaba-v2';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json'
];

// Instalación
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Cacheando recursos...');
                return cache.addAll(URLS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activación - limpiar cachés viejos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eliminando:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptar peticiones - ESTRATEGIA: Network first, fallback a caché
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Para el CSV - SIEMPRE usar red con proxy CORS, NUNCA caché directa
    if (url.pathname.includes('productos.csv')) {
        event.respondWith(
            fetch('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/elresolvito/RESUELVEhabana/main/productos.csv', { 
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' }
            })
            .then(response => {
                // Guardar en caché para offline
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, clone);
                });
                return response;
            })
            .catch(() => {
                // Fallback a caché si hay error
                return caches.match(event.request);
            })
        );
        return;
    }
    
    // Para imágenes - usar caché primero
    if (url.pathname.match(/\.(webp|jpg|jpeg|png|gif)$/)) {
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(event.request)
                        .then(response => {
                            const clone = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, clone);
                            });
                            return response;
                        })
                        .catch(() => {
                            return new Response('📷', { status: 200 });
                        });
                })
        );
        return;
    }
    
    // Para el resto - Network first, fallback a caché
    event.respondWith(
        fetch(event.request)
            .then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, clone);
                });
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
