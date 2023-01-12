import Component, { PropsType, StateType } from '../../Component'
import styles from './styles.module.css'

class Header extends Component<StateType, PropsType> {
  template(): string {
    return `
    <div class=${styles.container}>
      <a href="/" data-link>home</a>
      <a href="/test" data-link>test</a>
    </div>`
  }
}

export default Header
