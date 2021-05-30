// @ts-check
/// <reference lib="ES2015" />
/// <reference lib="webworker" />

declare var self: ServiceWorkerGlobalScope

const useCache = true

const cacheName = '0.0.7'
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

      return fetch(request)

      // if (!response || response.status !== '200' || response.type !== 'basic') {
      //   return response
      // }

      // const cache = await caches.open(cacheName)
      // await cache.put(response.clone())

      // return response
    })
  )
}

export default null

self.onactivate = e => {
  console.log('hey')
  // e.waitUntil(clearCache(cacheName))
}
