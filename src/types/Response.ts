import { CommentType, PostListType, PostType } from './Post'

export interface Response<T> {
  code?: number
  success?: boolean
  data: T
}

export interface PostListRes {
  posts: PostListType
}

export interface PostRes {
  post: PostType
  comments: CommentType[]
}

export interface AddPostRes extends PostType {}

export interface AddCommentRes {
  commentId: string
  postId: string
  content: string
}

export interface UnsplashRes {
  urls: {
    regular: string
  }
}
