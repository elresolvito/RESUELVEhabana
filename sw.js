// ============================================
// Service Worker para RESUELVEhabana
// Permite caché offline y carga más rápida
// ============================================

const CACHE_NAME = 'resuelve-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/productos.json'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    console.log('[SW] Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activar y limpiar cachés antiguos
self.addEventListener('activate', event => {
    console.log('[SW] Activado');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW] Eliminando caché antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Estrategia: Cache First, luego Network
self.addEventListener('fetch', event => {
    const url = event.request.url;
    
    // Solo cachear archivos de nuestro dominio
    if (url.includes('productos.json')) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        console.log('[SW] Cache hit:', url);
                        return response;
                    }
                    
                    return fetch(event.request)
                        .then(response => {
                            if (!response || response.status !== 200) {
                                return response;
                            }
                            
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });
                            return response;
                        });
                })
        );
    } else if (url.includes('.png') || url.includes('.jpg') || url.includes('.webp') || url.includes('.jpeg')) {
        // Para imágenes, usar Network First (si falla, usar caché)
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    }
    // Para el resto (HTML, CSS, JS), seguir con caché first
    else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
    }
});
