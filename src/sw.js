const cacheName = 'quizee-pwa';

self.addEventListener('install', function (event) {
    console.log("yes");
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