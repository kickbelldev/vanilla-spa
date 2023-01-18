import Component from '@src/Component'
import getTestRender from '@src/utils/getTestRender'
import NotFound from '.'

const render = getTestRender(NotFound as typeof Component, {})

describe('Header 컴포넌트', () => {
  it('타이틀 렌더링', () => {
    const { getByText } = render()

    const title = getByText('404 Not Found!')
    expect(title).toBeInTheDocument()
  })
})
