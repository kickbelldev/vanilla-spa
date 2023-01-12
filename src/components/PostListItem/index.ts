import Component, { PropsType, StateType } from '../../Component'
import { PostType } from '../../types/Post'
import styles from './styles.module.css'

interface PostState extends StateType {}

interface PostProps extends PropsType {
  post: PostType
}

class PostListItem extends Component<PostState, PostProps> {
  template(): string {
    return `
    <a href="/post/${this.props.post.postId}" data-link>
      <dl class=${styles.item}>
        <dt class=${styles.title}>${this.props.post.title}</dt>
        <dd class=${styles.body}>${this.props.post.content}</dd>
      </dl>
    </a>
    `
  }
}

export default PostListItem
