// import { allowedNodeEnvironmentFlags } from 'node:process'

const pad = (value: number) => (value < 10 ? '0' + value : value)

type time = number | null

export class Display {
  time: number
  constructor(
    private displayNode: HTMLElement,
    private label: string,
    private delta = 0
  ) {
    this.time = parseInt(localStorage.getItem(label) as string)
    this.setDisplay()
  }
  setDisplay(newTime: time = null) {
    if (newTime !== null) {
      this.time = newTime
    }

    let time = this.time

    localStorage.setItem(this.label, time.toString())

    this.time = time
    const hours = Math.floor(time / 3600000)
    time %= 3600000

    const minutes = Math.floor(time / 60000)
    time %= 60000

    const seconds = Math.floor(time / 1000)

    this.displayNode.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }
  start() {
    this.delta = Date.now()
  }
  tick = () => {
    const now = Date.now()
    this.setDisplay(this.time + now - this.delta)
    this.delta = now
  }

  mod = () => {
    this.setDisplay(this.time % 3600000)
  }
  reset = () => {
    this.setDisplay(0)
  }
}
