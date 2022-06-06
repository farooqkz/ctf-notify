self.onpushsubscriptionchange = (evt) => {
  console.log(evt);
};

self.oninstall = (evt) => {
  self.skipWaiting();
};

self.onactivate = (evt) => {
  evt.waitUntil(self.clients.claim());
};

self.onpush = (evt) => {
  fetch("/stats").then((r) => {
    if (r.ok) {
      r.json().then((j) => {
        self.registration.showNotification(`CTF match with ${j.players} online, ${j.mode} mode and ${j.map} map`);
      });
    } else {
      self.registration.showNotification("CTF match with your desired settings going on!");
    }
  });
};

self.onnotificationclick = (evt) => {
  evt.notification.close();
  evt.waitUntil(
    self.clients.matchAll().then((clients) => {
      if (clients.length === 0) {
        self.clients.openWindow();
      }
    })
  );
};
