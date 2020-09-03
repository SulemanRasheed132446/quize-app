export const serviceWorker = () => {
    const serviceWorkerUrl = `${process.env.PUBLIC_URL}/sw.js`
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(serviceWorkerUrl)
            .then(function (registration) {
                console.log('Registration successful, scope is:', registration.scope);
            })
            .catch(function (error) {
                console.log('Service worker registration failed, error:', error);
            });
    }
}