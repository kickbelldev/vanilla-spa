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
    <div class=${styles.container}>
      <input class=${styles.default}>
      <button class=${styles.add}>
      <i class=${styles.add}></i>
      </button>
    </div>
    `
  }

  setEvent(): void {
    this.addEvent('click', `button.${styles.add}`, () => {
      const inputValue = (this.target.querySelector(`input.${styles.default}`) as HTMLInputElement)
        .value
      if (!inputValue) {
        return
      }
      fetch
        .post<Response<AddCommentRes>>(`/comment/${this.props.postId}`, { content: inputValue })
        .then(({ data: res }) => {
          if (res.code < 400) {
            this.props.addCommentCallback(res.data.content, '' + res.data.commentId)
          }
          if (res.code === 400) {
            window.alert(`로딩에 실패했습니다. 에러코드: 400`)
          }
        })
        .catch((err: AxiosError) => {
          handleAPIError(err)
        })
    })
  }
}

export default CommentInput
