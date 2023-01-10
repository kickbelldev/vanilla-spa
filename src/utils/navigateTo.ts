import router from '../router'

const navigateTo = (url: string) => {
  history.pushState({}, '', url)
  router()
}

export default navigateTo
