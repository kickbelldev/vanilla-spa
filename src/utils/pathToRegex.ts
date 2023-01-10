const pathToRegex = (path: string) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$')

export default pathToRegex
