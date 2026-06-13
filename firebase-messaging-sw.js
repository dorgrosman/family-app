importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAXWgxjh4jH9Bd9zaQu0LPJwprEMfm4OFI",
  authDomain: "family-app-45d82.firebaseapp.com",
  projectId: "family-app-45d82",
  storageBucket: "family-app-45d82.firebasestorage.app",
  messagingSenderId: "811925409475",
  appId: "1:811925409475:web:d3b49f8908c1f582899c76"
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '🏠 הבית שלנו', {
    body: body || '',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    dir: 'rtl',
    lang: 'he',
    vibrate: [200, 100, 200],
    data: payload.data || {}
  });
});

// Click on notification → open app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
