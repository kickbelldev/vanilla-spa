import Component, { PropsType, StateType } from '../../Component'
import { CommentType } from '../../types/Post'
import { Response } from '../../types/Response'
import fetch from '../../utils/fetch'
import handleAPIError from '../../utils/handleAPIError'
import blockXss from '../../utils/blockXss'
import styles from './styles.module.css'

interface CommentPropsType extends PropsType {
  comment: CommentType
  deleteCommentCallback: (commentId: string) => void
}

class Comment extends Component<StateType, CommentPropsType> {
  template(): string {
    return `
    <div class=${styles.container}>
      <div class=${styles.content}>
        ${blockXss(this.props.comment.content)}
      </div>
      <button class=${styles.delete}>
      <i class=${styles.delete}></i>
      </button>
    </div>
    `
  }

  setEvent(): void {
    this.addEvent('click', `button.${styles.delete}`, this.deleteComment)
  }

  deleteComment(): void {
    fetch
      .delete<Response<unknown>>(`/comment/${this.props.comment.commentId}`)
      .then(() => this.props.deleteCommentCallback(this.props.comment.commentId))
      .catch(handleAPIError)
  }
}

export default Comment
