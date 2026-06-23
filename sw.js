// Service Worker para RESOLVITOhabana - v3 (CORREGIDO)
const CACHE_NAME = 'resolvitohaba-v3';

// Solo cachear recursos que SABEMOS que existen
const URLS_TO_CACHE = [
    '/',
    '/index.html'
];

// Instalación
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Cacheando recursos...');
                // Intentar cachear, pero si falla, no romper la instalación
                return cache.addAll(URLS_TO_CACHE).catch(err => {
                    console.warn('⚠️ Error cacheando algunos recursos:', err);
                    // Intentar cachear individualmente los que se puedan
                    return Promise.all(
                        URLS_TO_CACHE.map(url => 
                            cache.add(url).catch(() => {})
                        )
                    );
                });
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

// Interceptar peticiones
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Para el CSV - usar proxy CORS
    if (url.pathname.includes('productos.csv') || url.href.includes('corsproxy')) {
        event.respondWith(
            fetch(event.request, { 
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' }
            })
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
        return;
    }
    
    // Para imágenes - usar caché primero
    if (url.pathname.match(/\.(webp|jpg|jpeg|png|gif|svg)$/)) {
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
