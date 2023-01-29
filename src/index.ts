import router from './router'
import navigateTo from './utils/navigateTo'

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const $a = (e.target as HTMLElement).closest('a')
    if ($a?.matches('[data-link]')) {
      e.preventDefault()
      navigateTo($a.href)
    }
  })

  window.addEventListener('popstate', router)

  router()
})
