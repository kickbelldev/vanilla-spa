import Component, { PropsType } from '@src/Component'
import PostList from '@src/components/PostList'
import { PostListType } from '@src/types/Post'
import { PostListRes, Response } from '@src/types/Response'
import fetch from '@src/utils/fetch'
import handleAPIError from '@src/utils/handleAPIError'
import $ from './styles.module.css'

interface HomeStateType {
  list: PostListType
}

class Home extends Component<HomeStateType, PropsType> {
  didMount(): void {
    this.getPostList()
  }

  didUpdate(): void {
    this.renderPostList()
  }

  template(): string {
    return `
      <a href="/write" class=${$.buttonWrapper} data-link>
        <button><i></i>새 글 작성하기</button>
      </a>
      <div class="post-list"></div>
    `
  }

  getPostList(): void {
    fetch
      .get<Response<PostListRes>>('/posts')
      .then(({ data: res }) => {
        this.setState({ list: res.data.posts })
      })
      .catch(handleAPIError)
  }

  renderPostList(): void {
    const $postList: Element = this.target.querySelector('.post-list')!
    new PostList($postList, { list: this.state.list })
  }
}

export default Home
