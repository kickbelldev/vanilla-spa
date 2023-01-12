import Component, { PropsType, StateType } from '../../Component'
import { CommentListType, PostType } from '../../types/Post'
import styles from './styles.module.css'
import commonStyles from '../../styles/commonStyles.module.css'
import fetch from '../../utils/fetch'
import { PostRes, Response } from '../../types/Response'
import { AxiosError } from 'axios'

interface PostStateType extends StateType {
  post?: PostType
  comments?: CommentListType
  loading: boolean
}

interface PostPropsType extends PropsType {
  id: string
}

class Post extends Component<PostStateType, PostPropsType> {
  setup(): void {
    this.state = { loading: true }
  }

  didMount(): void {
    if (!this.props.id) {
      return
    }
    fetch
      .get<Response<PostRes>>(`/post/${this.props.id}`)
      .then(({ data: res }) => {
        this.setState({ ...res.data, loading: false })
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          window.alert(`로딩에 실패했습니다. 에러코드: ${err.response.status}`)
        }
      })
  }

  template(): string {
    if (this.state.loading) {
      return `<div class=${commonStyles.loading}>loading..</div>`
    }
    if (!this.state.post) {
      return `<div class=${commonStyles.notFound}>not found post</div>`
    }
    return `
    <div class=${styles.container}>
      <div class=${styles.title}>${this.state.post.title}</dt>
      <div class=${styles.body}>${this.state.post.content}</dd>
    </div>
    <div class=${styles.commentContainer}></div>
    `
  }
}

export default Post
