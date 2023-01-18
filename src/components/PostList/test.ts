import Component from '@src/Component'
import getTestRender from '@src/utils/getTestRender'
import { PostListType } from '@src/types/Post'
import PostList, { PostListPropsType } from '.'

const list: PostListType = new Array(5).fill(0).map((_, i) => ({
  postId: '' + i,
  title: `테스트타이틀${i}`,
  content: `테스트바디${i}`,
  image: 'https://source.unsplash.com/random',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}))

const data: PostListPropsType = { list }

const render = getTestRender(PostList as typeof Component, data)

describe('PostList 컴포넌트', () => {
  it('리스트 렌더링', () => {
    const { getByText, getByAltText } = render()

    for (const i in new Array(5)) {
      const title = getByText(`테스트타이틀${i}`)
      expect(title).toBeInTheDocument()

      const body = getByText(`테스트바디${i}`)
      expect(body).toBeInTheDocument()

      const img = getByAltText('썸네일')
      expect(img.getAttribute('src')).toBe('https://source.unsplash.com/random')
    }
  })
})
