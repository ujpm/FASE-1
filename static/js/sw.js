const CACHE_NAME = 'fase1-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/static/css/main.css',
    '/static/js/main.js',
    '/static/js/training.js',
    '/static/js/emergency.js',
    '/static/images/safety-assessment.jpg',
    '/static/images/cpr-steps.jpg',
    // Add other resources to cache
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch resources
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request)
                    .then((response) => {
                        // Cache new resources
                        if (response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return response;
                    });
            })
    );
});
