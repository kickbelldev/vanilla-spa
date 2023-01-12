import Component, { PropsType, StateType } from '../../Component'
import { CommentListType } from '../../types/Post'
import Comment from '../Comment'
import CommentInput from '../CommentInput'
import styles from './styles.module.css'

interface CommentSectionPropsType extends PropsType {
  comments: CommentListType
  postId: string
  deleteCommentCallback: (commentId: string) => void
  addCommentCallback: (content: string, commentId: string) => void
}

class CommentSection extends Component<StateType, CommentSectionPropsType> {
  didMount(): void {
    const $list: Element = this.target.querySelector(`ul.${styles.commentList}`)!
    this.props.comments.forEach((comment) => {
      const $comment = $list.appendChild(document.createElement('li'))
      new Comment($comment, {
        comment,
        deleteCommentCallback: this.props.deleteCommentCallback,
      })
    })

    const $input: Element = this.target.querySelector(`.${styles.commentInput}`)!
    new CommentInput($input, {
      postId: this.props.postId,
      addCommentCallback: this.props.addCommentCallback,
    })
  }

  didUpdate(): void {
    const $list: Element = this.target.querySelector(`ul.${styles.commentList}`)!
    this.props.comments.forEach((comment) => {
      const $comment = $list.appendChild(document.createElement('li'))
      $comment.setAttribute('class', styles.item)
      new Comment($comment, { comment, deleteCommentCallback: this.props.deleteCommentCallback })
    })
  }

  template(): string {
    return `
    <div class=${styles.container}>
      <ul class=${styles.commentList}>
      </ul>
      <div class=${styles.commentInput}>
      </div>
    </div>
    `
  }
}

export default CommentSection
