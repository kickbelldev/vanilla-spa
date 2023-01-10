import Component, { PropsType, StateType } from '../Component'

class Header extends Component<StateType, PropsType> {
  template(): string {
    return `
    <div>
      <a href="/" data-link>home</a>
      <a href="/post/1" data-link>post/1</a>
      <a href="/post/2" data-link>post/2</a>
      <a href="/post/3" data-link>post/3</a>
    </div>`
  }
}

export default Header
