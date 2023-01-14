import Component, { PropsType, StateType } from '@src/Component'
import { CommentType } from '@src/types/Post'
import { Response } from '@src/types/Response'
import fetch from '@src/utils/fetch'
import handleAPIError from '@src/utils/handleAPIError'
import blockXss from '@src/utils/blockXss'
import $ from './styles.module.css'

interface CommentPropsType extends PropsType {
  comment: CommentType
  deleteCommentCallback: (commentId: string) => void
}

class Comment extends Component<StateType, CommentPropsType> {
  template(): string {
    return `
    <div class=${$.container}>
      <div class=${$.content}>
        ${blockXss(this.props.comment.content)}
      </div>
      <button class=${$.delete}>
      <i class=${$.delete}></i>
      </button>
    </div>
    `
  }

  setEvent(): void {
    this.addEvent('click', `button.${$.delete}`, this.deleteComment)
  }

  deleteComment(): void {
    fetch
      .delete<Response<unknown>>(`/comment/${this.props.comment.commentId}`)
      .then(() => this.props.deleteCommentCallback(this.props.comment.commentId))
      .catch(handleAPIError)
  }
}

export default Comment
