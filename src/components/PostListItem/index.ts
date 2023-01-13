import Component, { PropsType, StateType } from '../../Component'
import { PostType } from '../../types/Post'
import blockXss from '../../utils/blockXss'
import styles from './styles.module.css'

interface PostState extends StateType {}

interface PostProps extends PropsType {
  post: PostType
}

class PostListItem extends Component<PostState, PostProps> {
  template(): string {
    return `
    <a href="/post/${this.props.post.postId}" data-link>
      <div class=${styles.item}>
        <figure>
          <img src=${this.props.post.image} alt="썸네일">
        </figure>
        <div class=${styles.content}>
        <div class=${styles.title}>${blockXss(this.props.post.title)}</div>
        <div class=${styles.body}>${blockXss(this.props.post.content)}</div>
        </div>
      </div>
    </a>
    `
  }
}

export default PostListItem
