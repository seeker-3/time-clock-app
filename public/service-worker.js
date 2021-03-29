const cacheName = 'static'
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'src/app.js',
  'src/index.css',
  'icons/clock.svg',
  'icons/clock.png',
]

const deleteCache = (cacheName = null) =>
  caches.keys().then(cacheNames =>
    Promise.all(
      cacheNames.map(name => {
        if (name !== cacheName) return caches.delete(name)
      })
    )
  )

self.oninstall = e => {
  e.waitUntil(
    caches.open(cacheName).then(async cache => {
      await cache.addAll(urlsToCache)
      await self.skipWaiting()
    })
  )
}

self.onfetch = e => {
  const { request } = e
  e.respondWith(
    caches.match(request).then(async cachedResponse => {
      if (cachedResponse) return cachedResponse

      const response = await fetch(request).catch(console.error)

      if (!response || response.status !== '200' || response.type !== 'basic') {
        return response
      }

      const cache = await caches.open(cacheName)
      await cache.put(response.clone())

      return response
    })
  )
}

self.onactivate = e => {
  e.waitUntil(deleteCache(cacheName))
}
