import { PostListType } from './Post'

export interface Response<T> {
  code: number
  data: T
}

export interface PostListRes {
  posts: PostListType
}
