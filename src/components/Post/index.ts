import Component, { PropsType, StateType } from '../../Component'
import { CommentListType, CommentType, PostType } from '../../types/Post'
import styles from './styles.module.css'
import commonStyles from '../../styles/commonStyles.module.css'
import fetch from '../../utils/fetch'
import { PostRes, Response } from '../../types/Response'
import { AxiosError } from 'axios'
import CommentSection from '../CommentSection'

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

  didUpdate(): void {
    const $comment = this.target.querySelector(`.${styles.commentContainer}`)!
    if (!this.state.post) {
      return
    }
    if (this.state.comments) {
      new CommentSection($comment, {
        comments: this.state.comments,
        postId: this.state.post.postId,
        deleteCommentCallback: this.deleteCommentCallback,
        addCommentCallback: this.addCommentCallback,
      })
    }
  }

  template(): string {
    if (this.state.loading) {
      return ``
    }
    if (!this.state.post) {
      return `<div class=${commonStyles.notFound}>포스트를 찾을 수 없습니다.</div>`
    }
    return `
    <div class=${styles.container}>
      <div class=${styles.title}>${this.state.post.title}</div>
      <div class=${styles.body}>${this.state.post.content}</div>
    </div>
    <div class=${styles.commentContainer}></div>
    `
  }

  deleteCommentCallback = (commentId: string): void => {
    if (!this.state.comments) {
      return
    }

    const newComments = this.state.comments.filter((comment) => commentId !== comment.commentId)
    this.setState({ comments: newComments })
  }

  addCommentCallback = (content: string, commentId: string) => {
    if (!this.state.comments) {
      return
    }

    const newComment: CommentType = {
      commentId,
      postId: this.props.id,
      content,
    }

    const newComments = [...this.state.comments, newComment]

    this.setState({ comments: newComments })
  }
}

export default Post
