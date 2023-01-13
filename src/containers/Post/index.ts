import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import Component, { PropsType, StateType } from '../../Component'
import { CommentListType, CommentType, PostType } from '../../types/Post'
import styles from './styles.module.css'
import fetch from '../../utils/fetch'
import { PostRes, Response } from '../../types/Response'
import CommentSection from '../../components/CommentSection'
import navigateTo from '../../utils/navigateTo'
import blockXss from '../../utils/blockXss'
import handleAPIError from '../../utils/handleAPIError'

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
      this.setState({ loading: false, post: undefined, comments: undefined })
      return
    }
    this.getPost()
  }

  didUpdate(): void {
    this.renderComment()
  }

  template(): string {
    if (this.state.loading) {
      return ``
    }
    if (!this.state.post) {
      return `<div class=${styles.notFound}>포스트를 찾을 수 없습니다.</div>`
    }
    const { post } = this.state
    return `
    <div class=${styles.container}>
      <div class=${styles.imgWrapper}>
        <img src=${post.image}>
      </div>
      <div class=${styles.content}>
        <h1 class=${styles.title}>${blockXss(post.title)}</h1>
        <div class=${styles.datetime}>
          ${
            dayjs(post.createdAt).isValid()
              ? dayjs(post.createdAt).format('YYYY. MM. DD')
              : 'YYYY. MM. DD'
          }
        </div>
        <div class=${styles.body}>${blockXss(post.content)}</div>
      </div>
      <div class=${styles.buttonContainer}>
        <a href="/edit/${post.postId}" data-link>
          <button class=${styles.edit}><i></i></button>
        </a>
        <button class=${styles.delete}><i></i></button>
      </div>
    </div>
    <div class=${styles.commentContainer}></div>
    `
  }

  setEvent(): void {
    this.addEvent('click', `.${styles.buttonContainer} .${styles.delete}`, () => {
      this.deletePost()
    })
  }

  getPost(): void {
    fetch
      .get<Response<PostRes>>(`/post/${this.props.id}`)
      .then(({ data: res }) => {
        if (!res.success) {
          this.setState({ loading: false, post: undefined, comments: undefined })
          return
        }
        this.setState({ ...res.data, loading: false })
      })
      .catch((err: AxiosError) => {
        handleAPIError(err)
        this.setState({ loading: false, post: undefined, comments: undefined })
      })
  }

  renderComment(): void {
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

  deletePost(): void {
    if (!this.state.post) {
      return
    }
    if (window.confirm('삭제하시겠습니까?')) {
      fetch
        .delete<Response<unknown>>(`/post/${this.state.post.postId}`)
        .then(({ data: res }) => {
          if (res.code !== 200) {
            window.alert('게시글 삭제 실패')
            return
          }
          navigateTo('/')
          window.alert('게시글 삭제 성공')
        })
        .catch(handleAPIError)
    }
  }

  deleteCommentCallback = (commentId: string): void => {
    if (!this.state.comments) {
      return
    }

    const newComments = this.state.comments.filter((comment) => commentId !== comment.commentId)
    this.setState({ comments: newComments })
  }

  addCommentCallback = (content: string, commentId: string): void => {
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
