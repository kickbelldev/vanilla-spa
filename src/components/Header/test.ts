import Component from '@src/Component'
import getTestRender from '@src/utils/getTestRender'
import Header from '.'

const render = getTestRender(Header as typeof Component, {})

describe('Header 컴포넌트', () => {
  it('타이틀 렌더링', () => {
    const { getByText } = render()

    const title = getByText('HPNY 2023')
    expect(title).toBeInTheDocument()
  })

  it('leftElement 루트 경로에서', () => {
    const { component } = render()
    const headerComponent = component as Header

    history.pushState({}, '', '/')

    const leftElement = headerComponent.getLeftElement()
    expect(leftElement).toBe('<div></div>')
  })

  it('leftElement 루트 제외', () => {
    const { component } = render()
    const headerComponent = component as Header

    history.pushState({}, '', '/write')

    const leftElement = headerComponent.getLeftElement()
    expect(leftElement).not.toBe('<div></div>')
  })
})
