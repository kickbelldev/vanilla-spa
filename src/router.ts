import _ from 'lodash'
import Component, { PropsType } from './Component'
import Home from './pages/Home'
import pathToRegex from './utils/pathToRegex'
import Post from './pages/Post'
import Write from './pages/Write'
import Page from './Page'
import NotFound from './components/NotFound'

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
  const { pathname } = location

  const resolvedRoutes: Route[] = routes.map((route) => ({
    ...route,
    resolved: pathname.match(pathToRegex(route.path)),
  }))

  const match = resolvedRoutes.find((route) => route.resolved)

  const $root = document.querySelector('#root')!

  if (!match) {
    new Page($root, {}, NotFound as typeof Component)
    return
  }

  match.resolved?.shift()

  const props: PropsType = { pageParams: _.toArray(match.resolved) }

  new Page($root, props, match.view)
}

export default router
