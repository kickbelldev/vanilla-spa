import Component, { PropsType, StateType } from '../Component'

interface HelloState extends StateType {}

interface HelloProps extends PropsType {
  hello: string
}

class Hello extends Component<HelloState, HelloProps> {
  template(): string {
    return `<h1>Hello, ${this.props.hello}!</h1>`
  }
}

export default Hello
