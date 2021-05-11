import './dom'

window.onload = async () => {
  const registration = await navigator.serviceWorker.register(
    new URL('service-worker.js', import.meta.url)
  )

  registration.onupdatefound = () => {
    location.reload()
    // if (window.confirm('site has been updated, confirm to reload'));
  }

  // navigator.serviceWorker.addEventListener('controllerchange', () => {})
}
