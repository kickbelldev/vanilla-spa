import router from './router'
import navigateTo from './utils/navigateTo'

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).matches('[data-link]')) {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      navigateTo(target.href)
    }
  })

  window.addEventListener('popstate', (e) => {
    router()
  })

  router()
})
