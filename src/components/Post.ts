import Component, { PropsType, StateType } from '../Component'
import { PostType } from '../data/Post'

interface PostState extends StateType {}

interface PostProps extends PropsType {
  post: PostType
}

class Post extends Component<PostState, PostProps> {
  template(): string {
    return `<h1>제목: ${this.props.post.title}</h1>`
  }
}

export default Post
