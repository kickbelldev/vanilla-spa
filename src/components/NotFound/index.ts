import Component, { PropsType, StateType } from '@src/Component'
import $ from './styles.module.css'

class NotFound extends Component<StateType, PropsType> {
  template(): string {
    return `<div class=${$.default}>404 Not Found!</div>`
  }
}

export default NotFound
