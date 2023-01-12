import { CommentType, PostListType, PostType } from './Post'

export interface Response<T> {
  code: number
  data: T
}

export interface PostListRes {
  posts: PostListType
}

export interface PostRes {
  post: PostType
  comments: CommentType[]
}

export interface AddCommentRes {
  commentId: string
  postId: string
  content: string
}
