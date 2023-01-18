import Component, { PropsType, StateType } from '@src/Component'
import { PostListType } from '@src/types/Post'
import PostListItem from '@src/components/PostListItem'
import $ from './styles.module.css'

export interface PostListPropsType extends PropsType {
  list: PostListType
}

class PostList extends Component<StateType, PostListPropsType> {
  didMount(): void {
    this.renderList()
  }

  template(): string {
    return `
    <ul class=${$.list}></ul>
    `
  }

  renderList(): void {
    const $list: Element = this.target.querySelector('ul')!
    this.props.list.forEach((post) => {
      const $post = $list.appendChild(document.createElement('li'))
      new PostListItem($post, { post })
    })
  }
}

export default PostList
