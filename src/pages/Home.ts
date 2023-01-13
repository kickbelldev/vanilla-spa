import Component, { PropsType } from '../Component'
import Header from '../components/Header'
import HomeComponent from '../containers/Home'
import { PostListType } from '../types/Post'

interface PostListStateType {
  list: PostListType
}

class Home extends Component<PostListStateType, PropsType> {
  didMount(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    const $home: Element = this.target.querySelector('.home')!
    new HomeComponent($home, {})
  }

  didUpdate(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    const $home: Element = this.target.querySelector('.home')!
    new HomeComponent($home, {})
  }

  template(): string {
    return `
      <div class="home"></div>
      <header></header>
    `
  }
}

export default Home
