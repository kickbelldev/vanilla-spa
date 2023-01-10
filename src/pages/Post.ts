import Component, { PropsType, StateType } from '../Component'
import Header from '../components/Header'
import Hello from '../components/Hello'

class Post extends Component<StateType, PropsType> {
  didMount(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    const $hello: Element = this.target.querySelector('.hello')!
    new Hello($hello, { hello: `Post/${this.props.pageParams?.toString()}` })
  }

  template(): string {
    return `
    <div>
      <header></header>
      <div class="hello"></div>
    </div>
    `
  }
}

export default Post
