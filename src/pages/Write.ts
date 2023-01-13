import Component, { PropsType, StateType } from '../Component'
import Header from '../components/Header'
import PostComponent from '../components/Post'

class Write extends Component<StateType, PropsType> {
  didMount(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})
  }

  template(): string {
    return `
      <header></header>
      <div class="post"></div>
    `
  }
}

export default Write
