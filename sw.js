const CACHE_NAME = 'agenda-adi-v5';
const STATIC_CACHE = 'static-v5';
const DYNAMIC_CACHE = 'dynamic-v5';

const STATIC_RESOURCES = [
    './',
    './index.html',
    './manifest.json',
    './sw.js',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Instalando...');
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE)
                .then(cache => {
                    console.log('[Service Worker] Pré-cacheando recursos estáticos');
                    return cache.addAll(STATIC_RESOURCES);
                })
                .catch(error => {
                    console.error('[Service Worker] Erro ao pré-cachear recursos:', error);
                }),
            self.skipWaiting()
        ])
    );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Ativando...');
    event.waitUntil(
        Promise.all([
            caches.keys()
                .then(keyList => {
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
self.addEventListener('fetch', (event) => {
    // Ignorar requisições para o Chrome Extension
    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    // Estratégia: Cache First, falling back to Network
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('[Service Worker] Retornando do cache:', event.request.url);
                    return response;
                }

                console.log('[Service Worker] Buscando recurso:', event.request.url);
                return fetch(event.request.clone())
                    .then(fetchResponse => {
                        // Não cachear respostas com erro ou não-básicas
                        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                            console.log('[Service Worker] Não cacheando resposta não-básica:', event.request.url);
                            return fetchResponse;
                        }

                        // Cache bem-sucedido
                        console.log('[Service Worker] Cacheando novo recurso:', event.request.url);
                        const responseToCache = fetchResponse.clone();

                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            })
                            .catch(error => {
                                console.error('[Service Worker] Erro ao cachear recurso:', error);
                            });

                        return fetchResponse;
                    })
                    .catch(error => {
                        console.error('[Service Worker] Erro ao buscar recurso:', error);
                        // Se for uma requisição de página HTML, retorne a página offline
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('./index.html');
                        }
                        // Retornar uma resposta de erro personalizada
                        return new Response('Erro de rede', {
                            status: 503,
                            statusText: 'Serviço indisponível',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
}); 