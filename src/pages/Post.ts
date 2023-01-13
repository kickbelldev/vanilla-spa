import Component, { PropsType, StateType } from '../Component'
import Header from '../components/Header'
import PostComponent from '../containers/Post'

class Post extends Component<StateType, PropsType> {
  didMount(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    const $post: Element = this.target.querySelector('.post')!
    new PostComponent($post, { id: this.props.pageParams![0] })
  }

  template(): string {
    return `
      <header></header>
      <div class="post"></div>
    `
  }
}

export default Post
