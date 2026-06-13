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

messaging.onBackgroundMessage(payload => {
  const title = (payload.notification && payload.notification.title) || '🏠 הבית שלנו';
  const body = (payload.notification && payload.notification.body) || '';
  return self.registration.showNotification(title, {
    body, icon: '/icon-192.png', badge: '/icon-192.png',
    dir: 'rtl', lang: 'he', vibrate: [200, 100, 200]
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});

// Fix: handle message events properly
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
