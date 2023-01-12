import { AxiosError } from 'axios'
import Component, { PropsType } from '../Component'
import Header from '../components/Header'
import Hello from '../components/Hello'
import Post from '../components/Post'
import { PostListRes, PostListType } from '../data/Post'
import { Response } from '../data/Response'
import fetch from '../utils/fetch'

interface PostListStateType {
  list: PostListType
}

class PostList extends Component<PostListStateType, PropsType> {
  didMount(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    fetch
      .get<Response<PostListRes>>('/posts')
      .then(({ data: res }) => {
        this.setState({ list: res.data.posts })
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }

  didUpdate(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    const $list: Element = this.target.querySelector('ul')!
    this.state.list.forEach((post) => {
      const $post = $list.appendChild(document.createElement('li'))
      $post.setAttribute('class', 'item')
      new Post($post, { post })
    })
  }

  template(): string {
    return `
    <div>
      <header></header>
      <div class="hello"></div>
      <ul>
      </ul>
    </div>
    `
  }
}

export default PostList
