// @ts-check
/// <reference lib="ES2015" />
/// <reference lib="webworker" />

declare var self: ServiceWorkerGlobalScope

export default null

const cacheVersion = '0.0.1'

const openCache = () => caches.open(cacheVersion)

const manualCache = async () => {
  const cache = await openCache()
  return cache.addAll([
    '/',
    'index.html',
    'manifest.json',
    'src/app.js',
    'src/index.css',
    'icons/clock.svg',
    'icons/clock.png',
  ])
}

const deleteCache = async () => {
  const cache = await caches.keys()
  return Promise.all(cache.map(name => caches.delete(name)))
}

const handleRequest = (request: RequestInfo) =>
  caches.match(request).then(response => response || fetch(request))

const cacheRequests = async ({ request }: { request: RequestInfo }) => {
  const response = await handleRequest(request)
  if (!response || response.status !== 200) return response

  const cache = await openCache()
  await cache.put(request, response.clone())

  return response
}

self.oninstall = e => e.waitUntil(self.skipWaiting())
self.onactivate = e => e.waitUntil(deleteCache())
self.onfetch = e => e.respondWith(cacheRequests(e))
