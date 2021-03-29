const pad = value => (value < 10 ? '0' + value : value)

class Clock {
  constructor(node) {
    this.node = node
    this.init()
  }
  init() {
    let time = +localStorage.getItem('time') ?? 0

    this.time = time
    this.hours = Math.floor(time / 3600)
    time %= 3600

    this.minutes = Math.floor(time / 60)
    time %= 60

    this.seconds = time

    this.set()
  }
  tick = () => {
    this.time += 1
    localStorage.setItem('time', this.time)
    this.seconds += 1
    if (this.seconds >= 60) {
      this.seconds = 0
      this.minutes += 1
      if (this.minutes >= 60) {
        this.minutes = 0
        this.hours += 1
      }
    }
    this.set()
  }
  set() {
    this.node.innerText = `${pad(this.hours)}:${pad(this.minutes)}:${pad(
      this.seconds
    )}`
  }
  floor = () => {
    this.time %= 3600
    localStorage.setItem('time', this.time)
    this.init()
  }
}

const startButton = document.querySelector('#start')
const floorButton = document.querySelector('#floor')
const clock = new Clock(document.querySelector('#display'))

let interval
startButton.onclick = () => {
  if (!interval) {
    startButton.innerText = 'stop'
    interval = setInterval(clock.tick, 1000)
  } else {
    startButton.innerText = 'start'
    clearInterval(interval)
    interval = null
  }
}

floorButton.onclick = clock.floor

window.onload = async () => {
  // const registration =
  await navigator.serviceWorker.register('service-worker.js')
}
