import _ from 'lodash'
import Component from './Component'
import Home from './pages/Home'
import pathToRegex from './utils/pathToRegex'
import Post from './pages/Post'
import Write from './pages/Write'

interface Route {
  path: string
  view: typeof Component
  resolved?: RegExpMatchArray | null
}

const routes: Route[] = [
  { path: '/', view: Home as typeof Component },
  { path: '/post/:id', view: Post as typeof Component },
  { path: '/edit/:id', view: Write as typeof Component },
  { path: '/write', view: Write as typeof Component },
]

const router = () => {
  const $root = document.querySelector('#root')!

  const { pathname } = location

  const dynamicRoutes: Route[] = routes.map((route) => ({
    ...route,
    resolved: pathname.match(pathToRegex(route.path)),
  }))

  const match = dynamicRoutes.find((route) => route.resolved)

  if (match) {
    match.resolved?.shift()
    new match.view($root, { pageParams: _.toArray(match.resolved) })
    return
  }

  document.querySelector('#root')!.innerHTML = '<h1>404 Not Found</h1>'
}

export default router
