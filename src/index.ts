import './dom'

window.onload = () =>
  navigator.serviceWorker
    .register(new URL('service-worker.ts', import.meta.url))
    .then(
      registration => {
        registration.onupdatefound = location.reload
      }
      // if (window.confirm('site has been updated, confirm to reload'));
    )

// navigator.serviceWorker.addEventListener('controllerchange', () => {})

export default null
