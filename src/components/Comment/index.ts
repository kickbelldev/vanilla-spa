import Component, { PropsType, StateType } from '@src/Component'
import { CommentType } from '@src/types/Post'
import { Response } from '@src/types/Response'
import blockXss from '@src/utils/blockXss'
import fetch from '@src/utils/fetch'
import handleAPIError from '@src/utils/handleAPIError'
import $ from './styles.module.css'

export interface CommentPropsType extends PropsType {
  comment: CommentType
  deleteCommentCallback: (commentId: string) => void
}

class Comment extends Component<StateType, CommentPropsType> {
  template(): string {
    return `
    <div class=${$.container}>
      <p class=${$.content} data-testid="content">
        ${blockXss(this.props.comment.content)}
      </p>
      <button class=${$.delete} data-testid="delete-button">
        <i class=${$.delete}></i>
      </button>
    </div>
    `
  }

  setEvent(): void {
    this.addEvent('click', `button.${$.delete}`, () => this.deleteComment())
  }

  deleteComment(): void {
    const commentId = this.props.comment.commentId
    fetch
      .delete<Response<unknown>>(`/comment/${commentId}`)
      .then(({ data }) => {
        if (data?.code === 200) {
          this.props.deleteCommentCallback(commentId)
        }
      })
      .catch(handleAPIError)
  }
}

export default Comment
