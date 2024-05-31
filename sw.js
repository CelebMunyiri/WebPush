self.addEventListener('push', function(event) {
    let data = {};
    if (event.data) {
        data = event.data.json();
    }

    const options = {
        title: data.title,
        body: data.body,
        badge: '/path/to/badge.png', // Specify your badge path
        tag: 'simple-tag'
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});