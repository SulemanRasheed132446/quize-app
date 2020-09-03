//
// Below is my Custom Service Working for caching the dynamic contents
//
const dynamicCache = 'Quizee-Dynamic-Cache';
const assets = [
    'https://opentdb.com/api.php?amount=10&category=18&type=multiple&difficulty=easy',
    'https://opentdb.com/api_category.php'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(dynamicCache).then((cache) => {
            cache.addAll(assets);
        })
    )
})

self.addEventListener('fetch', function (event) {
    console.log("hello");
    event.respondWith(
        caches.open(dynamicCache).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});