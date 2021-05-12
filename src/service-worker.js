const useCache = true

const cacheName = '0.0.6'
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'src/app.js',
  'src/index.css',
  'icons/clock.svg',
  'icons/clock.png',
]

const clearCache = (cacheName = null) =>
  caches.keys().then(cacheNames =>
    Promise.all(
      cacheNames.map(name => {
        if (name !== cacheName) return caches.delete(name)
      })
    )
  )

self.oninstall = e => {
  e.waitUntil(
    clearCache().then(async () => {
      if (!useCache) return
      const cache = await caches.open(cacheName)
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

      return fetch(request).catch(console.error)
      // const response =

      // if (!response || response.status !== '200' || response.type !== 'basic') {
      //   return response
      // }

      // const cache = await caches.open(cacheName)
      // await cache.put(response.clone())

      // return response
    })
  )
}

// self.onactivate = e => {
// e.waitUntil(clearCache(cacheName))
// }
