//
// Below is my Custom Service Working for caching the dynamic contents
//
const dynamicCache = 'Quizee-Dynamic-Cache';
const assets = [
    'https://opentdb.com/api_category.php',
    `https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple`,
    `https://opentdb.com/api.php?amount=5&category=12&difficulty=hard&type=multiple`,
    `https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple`,

];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(dynamicCache).then((cache) => {
            cache.addAll(assets);
        })
    )
})
