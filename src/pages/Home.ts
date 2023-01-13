import Component, { PropsType } from '../Component'
import Header from '../components/Header'
import HomeComponent from '../components/Home'
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
      <header></header>
      <div class="home"></div>
    `
  }
}

export default Home
