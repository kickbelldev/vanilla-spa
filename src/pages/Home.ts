import Component, { PropsType, StateType } from '../Component'
import Header from '../components/Header'
import Hello from '../components/Hello'

class Home extends Component<PropsType, StateType> {
  didMount(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    const $hello: Element = this.target.querySelector('.hello')!
    new Hello($hello, { hello: 'World' })
  }

  template(): string {
    return `
    <div>
      <header></header>
      <div class="hello"></div>
    </div>`
  }
}

export default Home
