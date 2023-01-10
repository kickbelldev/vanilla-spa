import _ from 'lodash'

export interface StateType {}
export interface PropsType {
  pageParams?: string[]
}

class Component<S extends StateType, P extends PropsType> {
  target: Element
  state: S
  props: P

  constructor(target: Element, props: P) {
    this.target = target
    this.state = {} as S
    this.props = props

    this.setup()
    this.mount()
    this.setEvent()
  }

  setup() {}

  template() {
    return `<div></div>`
  }
  render() {
    const template = this.template()
    if (!template) return
    this.target.innerHTML = template
  }
  mount() {
    this.render()
    this.didMount()
  }
  update() {
    this.render()
    this.didUpdate()
  }

  didMount() {}
  didUpdate() {}

  setState(newState: Partial<S>) {
    const nextState = { ...this.state, ...newState }
    if (_.isEqual(this.state, nextState)) {
      return
    }

    this.state = nextState
    this.update()
  }

  setEvent() {}
  addEvent(eventType: string, selector: string, callback: (e: Event) => void) {
    const children: Element[] = _.toArray(this.target.querySelectorAll(selector))

    const isTarget = (target: Element) => children.includes(target) || target.closest(selector)

    this.target.addEventListener(eventType, (event: Event): boolean => {
      if (!isTarget(event.target as HTMLElement)) return false
      callback(event)
      return true
    })
  }
}

export default Component
