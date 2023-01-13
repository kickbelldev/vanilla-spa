import Component, { PropsType, StateType } from '../../Component'
import styles from './styles.module.css'

class Header extends Component<StateType, PropsType> {
  template(): string {
    return `
    <div class=${styles.container}>
      ${
        location.pathname !== '/'
          ? `<a href="/" data-link><button class=${styles.back}><i></i></button></a>`
          : '<div></div>'
      }
      <a href="/" data-link><h2 class=${styles.default}>HPNY 2023</h2></a>
    </div>`
  }
}

export default Header
