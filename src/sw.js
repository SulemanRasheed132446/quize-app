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
