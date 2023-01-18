import Component, { PropsType, StateType } from '@src/Component'
import { PostType } from '@src/types/Post'
import blockXss from '@src/utils/blockXss'
import $ from './styles.module.css'

export interface PostListItemPropsType extends PropsType {
  post: PostType
}

class PostListItem extends Component<StateType, PostListItemPropsType> {
  template(): string {
    return `
      <a href="/post/${this.props.post.postId}" data-link>
        <div class=${$.item}>
          <figure>
            <img src=${this.props.post.image} alt="썸네일">
          </figure>
          <div class=${$.content}>
          <div class=${$.title}>${blockXss(this.props.post.title)}</div>
          <div class=${$.body}>${blockXss(this.props.post.content)}</div>
          </div>
        </div>
      </a>
    `
  }
}

export default PostListItem
