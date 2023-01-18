import Component, { PropsType } from '@src/Component'
import { getQueriesForElement } from '@testing-library/dom'

interface TestDataType extends PropsType {}

const getTestRender = (Cpnt: typeof Component, mockData: TestDataType) => () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const component = new Cpnt(container, mockData)
  return {
    container,
    component,
    ...getQueriesForElement(container),
  }
}

export default getTestRender
