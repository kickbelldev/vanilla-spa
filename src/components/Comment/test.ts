import Component from '@src/Component'
import { CommentType } from '@src/types/Post'
import getTestRender from '@src/utils/getTestRender'
import { waitFor } from '@testing-library/dom'
import { AxiosResponse } from 'axios'
import Comment, { CommentPropsType } from './index'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const comment: CommentType = {
  postId: '1',
  commentId: '5',
  content: '테스트',
}

const data: CommentPropsType = {
  comment,
  deleteCommentCallback: jest.fn(),
}

const render = getTestRender(Comment as typeof Component, data)

describe('Comment 컴포넌트', () => {
  beforeEach(() => {
    data.deleteCommentCallback = jest.fn()
  })

  it('렌더링', () => {
    const { getByTestId } = render()

    const contentText = '테스트'
    const content = getByTestId('content')
    expect(content).toHaveTextContent(contentText)

    const button = getByTestId('delete-button')
    expect(button).toBeInTheDocument()
  })

  it('댓글 삭제 성공', async () => {
    const { component, getByTestId } = render()

    const commentComponent = component as Comment
    const deleteComment = jest.spyOn(commentComponent, 'deleteComment')

    const mockResponse: Partial<AxiosResponse> = { data: { code: 200 }, status: 200 }
    mockedAxios.delete.mockReturnValue(new Promise((res) => res(mockResponse)))

    const button = getByTestId('delete-button')
    button.click()

    await waitFor(() => {
      expect(deleteComment).toBeCalled()
      expect(data.deleteCommentCallback).toBeCalled()
    })
  })

  it('댓글 삭제 실패', async () => {
    const { component, getByTestId } = render()

    const commentComponent = component as Comment
    const deleteComment = jest.spyOn(commentComponent, 'deleteComment')

    const mockResponse: Partial<AxiosResponse> = { data: { code: 400 }, status: 400 }
    mockedAxios.delete.mockReturnValue(new Promise((res) => res(mockResponse)))

    const button = getByTestId('delete-button')
    button.click()

    await waitFor(() => {
      expect(deleteComment).toBeCalled()
      expect(data.deleteCommentCallback).not.toHaveBeenCalled()
    })
  })
})
