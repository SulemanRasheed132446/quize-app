const cacheName = 'quizee-pwa';

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(
                [
                    'https://opentdb.com/api_category.php'
                ]
            );
        })
    );
});