import xss from 'xss'

const blockXss = (text: string) => {
  return xss(text)
}

export default blockXss
