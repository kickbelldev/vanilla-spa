import Component, { PropsType, StateType } from '../../Component'
import { PostListType } from '../../types/Post'
import PostListItem from '../PostListItem'
import styles from './styles.module.css'

interface PostState extends StateType {}

interface PostListPropsType extends PropsType {
  list: PostListType
}

class PostList extends Component<PostState, PostListPropsType> {
  didMount(): void {
    const $list: Element = this.target.querySelector('ul')!
    this.props.list.forEach((post) => {
      const $post = $list.appendChild(document.createElement('li'))
      new PostListItem($post, { post })
    })
  }

  template(): string {
    return `
    <ul class=${styles.list}></ul>
    `
  }
}

export default PostList
