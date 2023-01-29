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
  resolved: RegExpMatchArray | null
}

const routes: Route[] = [
  { path: '/', view: Home as typeof Component, resolved: null },
  { path: '/post/:id', view: Post as typeof Component, resolved: null },
  { path: '/edit/:id', view: Write as typeof Component, resolved: null },
  { path: '/write', view: Write as typeof Component, resolved: null },
]

const router = () => {
  const { pathname } = location

  const resolvedRoutes = routes.map((route) => {
    const resolved = pathname.match(pathToRegex(route.path))
    return {
      ...route,
      resolved,
    }
  })

  const match = resolvedRoutes.find((route) => route.resolved)

  const $root = document.querySelector('#root')!

  if (!match?.resolved) {
    new Page($root, {}, NotFound as typeof Component)
    return
  }

  const pageParams = _.toArray(match.resolved.slice(1))
  const props: PropsType = { pageParams }

  new Page($root, props, match.view)
}

export default router
