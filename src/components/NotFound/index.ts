import Component, { PropsType, StateType } from '../../Component'
import styles from './styles.module.css'

class NotFound extends Component<StateType, PropsType> {
  template(): string {
    return `<div class=${styles.default}>404 Not Found!</div>`
  }
}

export default NotFound
