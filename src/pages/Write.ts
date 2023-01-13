import Component, { PropsType, StateType } from '../Component'
import Header from '../components/Header'
import WriteComponent from '../containers/Write'

class Write extends Component<StateType, PropsType> {
  didMount(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    const $write: Element = this.target.querySelector('.write')!
    new WriteComponent($write, { postId: this.props.pageParams?.[0] })
  }

  template(): string {
    return `
      <div class="write"></div>
      <header></header>
    `
  }
}

export default Write
