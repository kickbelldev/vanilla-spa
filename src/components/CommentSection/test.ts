import Component from '@src/Component'
import getTestRender from '@src/utils/getTestRender'
import CommentSection, { CommentSectionPropsType } from '.'

const data: CommentSectionPropsType = {
  postId: '1',
  comments: [
    {
      commentId: '1',
      content: '안녕하세요',
      postId: '1',
    },
    {
      commentId: '2',
      content: '테스트2',
      postId: '1',
    },
    {
      commentId: '3',
      content: '테스트3',
      postId: '1',
    },
  ],
  addCommentCallback: jest.fn(),
  deleteCommentCallback: jest.fn(),
}

const render = getTestRender(CommentSection as typeof Component, data)

describe('CommentSection 컴포넌트', () => {
  beforeEach(() => {
    data.addCommentCallback = jest.fn()
    data.deleteCommentCallback = jest.fn()
  })

  it('리스트 렌더링', async () => {
    const { getByText } = render()

    expect(getByText('안녕하세요')).toBeInTheDocument()
    expect(getByText('테스트2')).toBeInTheDocument()
    expect(getByText('테스트3')).toBeInTheDocument()
  })

  it('인풋 렌더링', async () => {
    const { getByTestId } = render()

    expect(getByTestId('input')).toBeInTheDocument()
  })
})
