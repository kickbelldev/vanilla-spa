import Component, { PropsType, StateType } from '../Component'
import Header from '../components/Header'
import Post from '../components/Post'
import { PostType } from '../types/Post'

class PostPage extends Component<StateType, PropsType> {
  didMount(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    const $post: Element = this.target.querySelector('.post')!
    new Post($post, { id: this.props.pageParams![0] })
  }

  template(): string {
    return `
    <div>
      <header></header>
      <div class="post"></div>
    </div>`
  }
}

export default PostPage
