const pad = value => (value < 10 ? '0' + value : value)

class Clock {
  constructor(displayNode) {
    this.displayNode = displayNode
    this.time = +localStorage.getItem('time') ?? 0
    this.setDisplay()
  }
  setDisplay(newTime = null) {
    if (newTime !== null) {
      this.time = newTime
    }

    localStorage.setItem('time', this.time)
    let time = this.time

    this.time = time
    this.hours = Math.floor(time / 3600000)
    time %= 3600000

    this.minutes = Math.floor(time / 60000)
    time %= 60000

    this.seconds = Math.floor(time / 1000)

    this.displayNode.innerText = `${pad(this.hours)}:${pad(this.minutes)}:${pad(
      this.seconds
    )}`
  }
  start() {
    this.delta = Date.now()
  }
  tick = () => {
    const now = Date.now()
    this.setDisplay(this.time + now - this.delta)
    this.delta = now
    // this.seconds += 1
    // if (this.seconds >= 60) {
    //   this.seconds = 0
    //   this.minutes += 1
    //   if (this.minutes >= 60) {
    //     this.minutes = 0
    //     this.hours += 1
    //   }
    // }
    // this.setDisplay()
  }

  mod = () => {
    this.setDisplay(this.time % 3600000)
  }
  reset = () => {
    this.setDisplay(0)
  }
}

const clock = new Clock(document.querySelector('#display'))

const startButton = document.querySelector('#start')

let interval
startButton.onclick = () => {
  if (!interval) {
    startButton.textContent = 'stop'
    clock.start()
    interval = setInterval(clock.tick, 1000)
  } else {
    startButton.textContent = 'start'
    clearInterval(interval)
    interval = null
  }
}

document.querySelector('#mod').onclick = clock.mod
document.querySelector('#reset').onclick = clock.reset

window.onload = async () => {
  const registration = await navigator.serviceWorker.register(
    'service-worker.js'
  )

  console.log(registration)

  registration.onupdatefound = () => {
    location.reload()
    // if (window.confirm('site has been updated, confirm to reload'));
  }

  // navigator.serviceWorker.addEventListener('controllerchange', () => {})
}
