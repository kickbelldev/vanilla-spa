import { AxiosError } from 'axios'
import Component, { PropsType } from '../../Component'
import Header from '../../components/Header'
import PostList from '../../components/PostList'
import { PostListType } from '../../types/Post'
import { PostListRes, Response } from '../../types/Response'
import fetch from '../../utils/fetch'
import styles from './styles.module.css'

interface PostListStateType {
  list: PostListType
}

class Home extends Component<PostListStateType, PropsType> {
  didMount(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    fetch
      .get<Response<PostListRes>>('/posts')
      .then(({ data: res }) => {
        this.setState({ list: res.data.posts })
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          window.alert(`로딩에 실패했습니다. 에러코드: ${err.response.status}`)
        }
      })
  }

  didUpdate(): void {
    const $header: Element = this.target.querySelector('header')!
    new Header($header, {})

    const $postList: Element = this.target.querySelector('.post-list')!
    new PostList($postList, { list: this.state.list })
  }

  template(): string {
    return `
      <header></header>
      <div>
        <a href="/write" class=${styles.buttonWrapper} data-link>
          <button><i></i>새 글 작성하기</button>
        </a>
        <div class="post-list"></div>
      </div>
    `
  }
}

export default Home
