const cacheName = 'cache-v1';
const resourcesToCache = [
    '/',
    'index.html',
    'assets/css/styles.css',
    'assets/bootstrap/css/bootstrap.min.css',
    'assets/bootstrap/js/bootstrap.min.js',
    'assets/images/icon.png',
    'assets/images/android-chrome-192x192.png',
    'assets/images/android-chrome-256x256.png',
    'assets/images/apple-touch-icon.png',
    'assets/images/favicon.ico',
    'assets/images/favicon-16x16.png',
    'assets/images/favicon-32x32.png',
    'assets/images/mstile-150x150.png',
    'assets/images/safari-pinned-tab.svg',
    'browserconfig.xml',
    'assets/js/scripts.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(resourcesToCache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Activate event');
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});