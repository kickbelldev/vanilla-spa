import { getQueriesForElement } from '@testing-library/dom'
import blockXss from '@src/utils/blockXss'
import Comment from './index'

function render() {
  const container = document.createElement('div')
  document.body.appendChild(container)
  new Comment(container, {
    comment: { postId: '1', commentId: '5', content: '테스트' },
    deleteCommentCallback: () => {},
  })
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('render', async () => {
  const { getByText } = render()
  const content = getByText(blockXss('테스트'))

  console.log(content)

  expect(content).toBe('테스트')
})
