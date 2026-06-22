// Service Worker para RESOLVITOhabana
const CACHE_NAME = 'resolvitohaba-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    'https://raw.githubusercontent.com/elresolvito/RESUELVEhabana/main/productos.csv',// Service Worker para RESOLVITOhabana - v2
const CACHE_NAME = 'resolvitohaba-v2';
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
    
    // Para el CSV - SIEMPRE usar red, NUNCA caché
    if (url.pathname.includes('productos.csv')) {
        event.respondWith(
            fetch(event.request, { 
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
    'https://i.postimg.cc/rFmpywjV/banner-1l.webp',
    'https://i.postimg.cc/xdrjPy2M/plaza-nocturna.webp'
];

// Instalación - cachear recursos estáticos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Cacheando recursos...');
                return cache.addAll(URLS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activación - limpiar cachés antiguos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eliminando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptar peticiones - estrategia: cache first, luego network
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Para el CSV - siempre intentar red, si falla usar caché
    if (url.pathname.includes('productos.csv')) {
        event.respondWith(
            fetch(event.request, { cache: 'no-cache' })
                .then(response => {
                    // Guardar en caché la nueva versión
                    const clonedResponse = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, clonedResponse);
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
    if (url.pathname.match(/\.(webp|jpg|jpeg|png|gif)$/)) {
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(event.request)
                        .then(response => {
                            const clonedResponse = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, clonedResponse);
                            });
                            return response;
                        })
                        .catch(() => {
                            // Placeholder si no hay imagen
                            return new Response('📷 Sin imagen', {
                                status: 200,
                                statusText: 'OK',
                                headers: { 'Content-Type': 'text/plain' }
                            });
                        });
                })
        );
        return;
    }
    
    // Para el resto - network first, fallback a caché
    event.respondWith(
        fetch(event.request)
            .then(response => {
                const clonedResponse = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, clonedResponse);
                });
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
