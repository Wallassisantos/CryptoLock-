const CACHE_NAME = 'meu-cache';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/scripts.js',
  '/imagens/logo.png'
  // adicione aqui todos os recursos que deseja armazenar em cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});


