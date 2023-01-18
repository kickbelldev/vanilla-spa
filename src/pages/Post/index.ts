import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import Component, { PropsType, StateType } from '@src/Component'
import { CommentListType, CommentType, PostType } from '@src/types/Post'
import fetch from '@src/utils/fetch'
import { PostRes, Response } from '@src/types/Response'
import CommentSection from '@src/components/CommentSection'
import navigateTo from '@src/utils/navigateTo'
import blockXss from '@src/utils/blockXss'
import handleAPIError from '@src/utils/handleAPIError'
import $ from './styles.module.css'

interface PostStateType extends StateType {
  post?: PostType
  comments?: CommentListType
  loading: boolean
}

class Post extends Component<PostStateType, PropsType> {
  setup(): void {
    this.state = { loading: true }
  }

  didMount(): void {
    if (!this.props.pageParams) {
      this.setState({ loading: false, post: undefined, comments: undefined })
      return
    }
    const postId = this.props.pageParams[0]

    this.getPost(postId)
  }

  didUpdate(): void {
    this.renderComment()
  }

  template(): string {
    if (this.state.loading) {
      return ``
    }
    if (!this.state.post) {
      return `<div class=${$.notFound}>포스트를 찾을 수 없습니다.</div>`
    }
    const { post } = this.state
    return `
    <div class=${$.container}>
      <div class=${$.imgWrapper}>
        <img src=${post.image}>
      </div>
      <div class=${$.content}>
        <h1 class=${$.title}>${blockXss(post.title)}</h1>
        <div class=${$.datetime}>
          ${
            dayjs(post.createdAt).isValid()
              ? dayjs(post.createdAt).format('YYYY. MM. DD')
              : 'YYYY. MM. DD'
          }
        </div>
        <div class=${$.body}>${blockXss(post.content)}</div>
      </div>
      <div class=${$.buttonContainer}>
        <a href="/edit/${post.postId}" data-link>
          <button class=${$.edit}><i></i></button>
        </a>
        <button class=${$.delete}><i></i></button>
      </div>
    </div>
    <div class=${$.commentContainer}></div>
    `
  }

  setEvent(): void {
    this.addEvent('click', `.${$.buttonContainer} .${$.delete}`, () => {
      this.deletePost()
    })
  }

  getPost(postId: string): void {
    fetch
      .get<Response<PostRes>>(`/post/${postId}`)
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
    const $comment = this.target.querySelector(`.${$.commentContainer}`)!
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
    if (!this.state.comments || !this.props.pageParams) {
      return
    }

    const postId = this.props.pageParams[0]

    const newComment: CommentType = {
      commentId,
      postId,
      content,
    }

    const newComments = [...this.state.comments, newComment]
    this.setState({ comments: newComments })
  }
}

export default Post
