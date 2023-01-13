import Component, { PropsType, StateType } from './Component'
import Header from './components/Header'

class Page<P extends PropsType> extends Component<StateType, PropsType> {
  constructor(target: Element, props: P, container: typeof Component) {
    super(target, props)

    this.mountHeader()
    this.mountContainer(container)
  }

  template(): string {
    return `
      <div class="container"></div>
      <header></header>
    `
  }

  mountHeader(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})
  }

  mountContainer(container: typeof Component): void {
    const $container = this.target.querySelector('.container')!
    new container($container, { pageParams: this.props.pageParams })
  }
}

export default Page
