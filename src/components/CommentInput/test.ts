import Component from '@src/Component'
import getTestRender from '@src/utils/getTestRender'
import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { AxiosResponse } from 'axios'
import axios from 'axios'
import CommentInput, { CommentInputPropsType } from '.'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const data: CommentInputPropsType = {
  postId: '1',
  addCommentCallback: jest.fn(),
}

const render = getTestRender(CommentInput as typeof Component, data)

describe('CommentInput 컴포넌트', () => {
  beforeEach(() => {
    data.addCommentCallback = jest.fn()
  })

  it('렌더링', () => {
    const { getByTestId } = render()

    const form = getByTestId('form')
    expect(form).toBeInTheDocument()

    const input = getByTestId('input')
    expect(input).toBeInTheDocument()

    const button = getByTestId('add-button')
    expect(button).toBeInTheDocument()

    const i = getByTestId('add-icon')
    expect(i).toBeInTheDocument()
  })

  it('댓글 작성 성공', async () => {
    const { component, getByTestId } = render()

    const commentInputComponent = component as CommentInput
    const addComment = jest.spyOn(commentInputComponent, 'addComment')

    const text = '테스트입니다'
    const input = getByTestId('input') as HTMLInputElement
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input.value).toBe(text)
    })

    const mockResponse: Partial<AxiosResponse> = {
      data: {
        code: 201,
        data: {
          commentId: '5',
          postId: '1',
          content: input.value,
        },
      },
      status: 201,
    }
    mockedAxios.post.mockReturnValue(new Promise((res) => res(mockResponse)))

    const button = getByTestId('add-button')

    button.click()

    await waitFor(() => {
      expect(addComment).toBeCalled()
      expect(data.addCommentCallback).toBeCalled()
    })
  })

  it('댓글 작성 실패', async () => {
    const { component, getByTestId } = render()

    const commentInputComponent = component as CommentInput
    const addComment = jest.spyOn(commentInputComponent, 'addComment')

    const text = '테스트입니다'
    const input = getByTestId('input') as HTMLInputElement
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input.value).toBe(text)
    })

    const mockResponse: Partial<AxiosResponse> = {
      data: {
        code: 400,
        message: '중복 댓글은 작성할 수 없습니다.',
      },
      status: 400,
    }
    mockedAxios.post.mockReturnValue(new Promise((res) => res(mockResponse)))

    const button = getByTestId('add-button')

    button.click()

    await waitFor(() => {
      expect(addComment).toBeCalled()
      expect(data.addCommentCallback).not.toBeCalled()
      expect(window.alert).toBeCalledWith('중복 댓글은 작성할 수 없습니다.')
    })
  })
})
