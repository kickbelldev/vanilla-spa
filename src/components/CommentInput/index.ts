import { AxiosError } from 'axios'
import Component, { PropsType, StateType } from '../../Component'
import { AddCommentRes, Response } from '../../types/Response'
import fetch from '../../utils/fetch'
import handleAPIError from '../../utils/handleAPIError'
import styles from './styles.module.css'

interface CommentPropsType extends PropsType {
  postId: string
  addCommentCallback: (content: string, commentId: string) => void
}

class CommentInput extends Component<StateType, CommentPropsType> {
  didMount(): void {}

  template(): string {
    return `
    <form class=${styles.container}>
      <input class=${styles.default}>
      <button class=${styles.add}>
      <i class=${styles.add}></i>
      </button>
    </form>
    `
  }

  setEvent(): void {
    this.addEvent('click', `button.${styles.add}`, (e) => {
      e.preventDefault()

      const inputValue = (this.target.querySelector(`input.${styles.default}`) as HTMLInputElement)
        .value
      if (!inputValue) {
        window.alert('메시지를 입력해주세요.')
        return
      }

      this.addComment(inputValue)
    })
  }

  addComment(content: string) {
    fetch
      .post<Response<AddCommentRes>>(`/comment/${this.props.postId}`, { content })
      .then(({ data: res }) => {
        if (res.code! < 400) {
          this.props.addCommentCallback(res.data.content, '' + res.data.commentId)
          return
        }
        window.alert(`요청을 실패했습니다.`)
      })
      .catch((err: AxiosError) => {
        handleAPIError(err)
      })
  }
}

export default CommentInput
