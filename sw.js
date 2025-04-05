const CACHE_NAME = 'agenda-adi-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_RESOURCES = [
    './',
    './index.html',
    './admin.html',
    './firebase-config.js',
    './manifest.json',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Instalando...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('[Service Worker] Pré-cacheando recursos estáticos');
                return cache.addAll(STATIC_RESOURCES);
            })
    );
    self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker] Ativando...');
    event.waitUntil(
        caches.keys()
            .then(keyList => {
                return Promise.all(keyList.map(key => {
                    if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                        console.log('[Service Worker] Removendo cache antigo:', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
    // Estratégia Cache First com fallback para Network
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then(res => {
                        // Armazena no cache dinâmico apenas recursos válidos e locais
                        if (res.ok && (event.request.url.indexOf('http') === 0)) {
                            return caches.open(DYNAMIC_CACHE)
                                .then(cache => {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                });
                        }
                        return res;
                    })
                    .catch(() => {
                        // Retorna uma resposta offline personalizada se necessário
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
}); 