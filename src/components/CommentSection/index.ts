import Component, { PropsType, StateType } from '@src/Component'
import { CommentListType } from '@src/types/Post'
import Comment from '@src/components/Comment'
import CommentInput from '@src/components/CommentInput'
import $ from './styles.module.css'

interface CommentSectionPropsType extends PropsType {
  comments: CommentListType
  postId: string
  deleteCommentCallback: (commentId: string) => void
  addCommentCallback: (content: string, commentId: string) => void
}

class CommentSection extends Component<StateType, CommentSectionPropsType> {
  didMount(): void {
    this.renderList()
    this.renderInput()
  }

  template(): string {
    return `
    <div class=${$.container}>
      <ul class=${$.commentList}>
      </ul>
      <div class=${$.commentInput}>
      </div>
    </div>
    `
  }

  renderList(): void {
    const $list: Element = this.target.querySelector(`ul.${$.commentList}`)!
    this.props.comments.forEach((comment) => {
      const $comment = $list.appendChild(document.createElement('li'))
      new Comment($comment, {
        comment,
        deleteCommentCallback: this.props.deleteCommentCallback,
      })
    })
  }

  renderInput(): void {
    const $input: Element = this.target.querySelector(`.${$.commentInput}`)!
    new CommentInput($input, {
      postId: this.props.postId,
      addCommentCallback: this.props.addCommentCallback,
    })
  }
}

export default CommentSection
