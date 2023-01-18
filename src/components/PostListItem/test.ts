import Component from '@src/Component'
import { PostType } from '@src/types/Post'
import getTestRender from '@src/utils/getTestRender'
import PostListItem, { PostListItemPropsType } from '.'

const post: PostType = {
  postId: '1',
  title: `테스트타이틀1`,
  content: `테스트바디1`,
  image: 'https://source.unsplash.com/random',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const data: PostListItemPropsType = { post }

const render = getTestRender(PostListItem as typeof Component, data)

describe('PostListItem 컴포넌트', () => {
  it('렌더링', () => {
    const { getByText, getByAltText } = render()

    const title = getByText(`테스트타이틀1`)
    expect(title).toBeInTheDocument()

    const body = getByText(`테스트바디1`)
    expect(body).toBeInTheDocument()

    const img = getByAltText('썸네일')
    expect(img.getAttribute('src')).toBe('https://source.unsplash.com/random')
  })
})
