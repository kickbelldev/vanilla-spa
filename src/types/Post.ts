export interface PostType {
  postId: string
  title: string
  content: string
  img: string
  createdAt: string
  updatedAt: string
}

export type PostListType = PostType[]

export interface CommentType {
  commentId: string
  postId: string
  content: string
}

export type CommentListType = CommentType[]
