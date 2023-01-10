import _ from 'lodash'
import Component from './Component'
import Home from './pages/Home'
import Post from './pages/Post'
import pathToRegex from './utils/pathToRegex'

interface Route {
  path: string
  view: typeof Component
  resolved?: RegExpMatchArray | null
}

const router = () => {
  const $root = document.querySelector('#root')!

  const routes: Route[] = [
    { path: '/', view: Home as typeof Component },
    { path: '/post/:id', view: Post as typeof Component },
  ]

  const { pathname } = location

  const dynamicRoutes: Route[] = routes.map((route) => ({
    ...route,
    resolved: pathname.match(pathToRegex(route.path)),
  }))

  const match = dynamicRoutes.find((route) => route.resolved)

  if (match) {
    match.resolved?.shift()
    new match.view($root, { pageParams: _.toArray(match.resolved) }).mount()
    return
  }

  document.querySelector('#root')!.innerHTML = '<h1>404 Not Found</h1>'
}

export default router
