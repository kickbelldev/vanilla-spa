import { AxiosError } from 'axios'
import Component, { PropsType } from '../../Component'
import PostList from '../../components/PostList'
import { PostListType } from '../../types/Post'
import { PostListRes, Response } from '../../types/Response'
import fetch from '../../utils/fetch'
import handleAPIError from '../../utils/handleAPIError'
import styles from './styles.module.css'

interface HomeStateType {
  list: PostListType
}

class Home extends Component<HomeStateType, PropsType> {
  didMount(): void {
    fetch
      .get<Response<PostListRes>>('/posts')
      .then(({ data: res }) => {
        this.setState({ list: res.data.posts })
      })
      .catch((err: AxiosError) => {
        handleAPIError(err)
      })
  }

  didUpdate(): void {
    const $postList: Element = this.target.querySelector('.post-list')!
    new PostList($postList, { list: this.state.list })
  }

  template(): string {
    return `
      <a href="/write" class=${styles.buttonWrapper} data-link>
        <button><i></i>새 글 작성하기</button>
      </a>
      <div class="post-list"></div>
    `
  }
}

export default Home
