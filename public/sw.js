const cacheName = 'quiz app';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(
                [
                    '/index.html',
                    '/static/js/bundle.js',
                    '/static/js/0.chunk.js',
                    '/static/js/main.chunk.js',
                    '/',
                    'https://opentdb.com/api_category.php'
                ]
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(cacheName).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});