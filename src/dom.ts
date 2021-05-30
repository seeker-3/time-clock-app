import { Display } from './display'

const labelAccessor = 'display-labels'

const labels = JSON.parse(localStorage.getItem(labelAccessor) ?? '[]')

const writeLabels = () =>
  localStorage.setItem(labelAccessor, JSON.stringify(labels))

const main = document.querySelector('#timer-container') as HTMLDivElement

const mountDisplay = (label: string) => {
  const div = document.createElement('div')
  const buttonGroup = document.createElement('div')
  buttonGroup.className = 'button-group'

  const startButton = document.createElement('button')
  const modButton = document.createElement('button')
  const resetButton = document.createElement('button')
  const deleteButton = document.createElement('button')

  const displayNode = document.createElement('h1')
  const labelNode = document.createElement('h1')

  div.appendChild(labelNode)
  div.appendChild(displayNode)
  div.appendChild(buttonGroup)

  buttonGroup.appendChild(startButton)
  buttonGroup.appendChild(modButton)
  buttonGroup.appendChild(resetButton)
  buttonGroup.appendChild(deleteButton)

  startButton.innerText = 'start'
  modButton.innerText = 'mod'
  resetButton.innerText = 'reset'
  deleteButton.innerText = 'delete'

  labelNode.innerText = label
  const display = new Display(displayNode, label)

  let interval: number | null
  startButton.onclick = () => {
    if (!interval) {
      startButton.textContent = 'stop'
      display.start()
      interval = setInterval(display.tick, 500)
    } else {
      startButton.textContent = 'start'
      clearInterval(interval)
      interval = null
    }
  }

  deleteButton.onclick = () => {
    main.removeChild(div)
    localStorage.removeItem(label)
    labels.splice(labels.indexOf(label), 1)
    writeLabels()
  }

  modButton.onclick = display.mod
  resetButton.onclick = display.reset

  main.appendChild(div)
}

for (const label of labels) mountDisplay(label)

const newButton = document.querySelector(
  '#timer-input > button'
) as HTMLButtonElement
const newTimerLabel = document.querySelector(
  '#timer-input > input'
) as HTMLInputElement

if (newButton !== null && newTimerLabel !== null) {
  newButton.onclick = () => {
    const label = newTimerLabel.value

    if (label === '' || labels.includes(label)) return
    newTimerLabel.value = ''
    labels.push(label)
    writeLabels()
    localStorage.setItem(label, '0')
    mountDisplay(label)
  }
} else {
  console.error('did not get nodes')
}
