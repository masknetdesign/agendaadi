const CACHE_NAME = 'agenda-adi-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';

const STATIC_RESOURCES = [
    '/',
    '/index.html',
    '/admin.html',
    '/firebase-config.js',
    '/manifest.json',
    '/sw.js',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
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
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => {
                console.log('[Service Worker] Pré-cacheando recursos estáticos');
                return cache.addAll(STATIC_RESOURCES);
            }),
            self.skipWaiting()
        ])
    );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker] Ativando...');
    event.waitUntil(
        Promise.all([
            caches.keys().then(keyList => {
                return Promise.all(keyList.map(key => {
                    if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                        console.log('[Service Worker] Removendo cache antigo:', key);
                        return caches.delete(key);
                    }
                }));
            }),
            self.clients.claim()
        ])
    );
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

                return fetch(event.request.clone())
                    .then(res => {
                        // Não cachear respostas com erro
                        if (!res || res.status !== 200) {
                            return res;
                        }

                        // Armazena no cache dinâmico
                        const responseToCache = res.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return res;
                    })
                    .catch(() => {
                        // Retorna página offline para requisições HTML
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
}); 