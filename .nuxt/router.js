import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _3350fddf = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _746ac0d6 = () => import('..\\pages\\Login.vue' /* webpackChunkName: "pages\\Login" */).then(m => m.default || m)
const _e48b5d7e = () => import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages\\dashboard\\index" */).then(m => m.default || m)
const _1d4b982a = () => import('..\\pages\\dashboard\\add-collection.vue' /* webpackChunkName: "pages\\dashboard\\add-collection" */).then(m => m.default || m)
const _689059f2 = () => import('..\\pages\\dashboard\\add-link.vue' /* webpackChunkName: "pages\\dashboard\\add-link" */).then(m => m.default || m)
const _859b397c = () => import('..\\pages\\_username.vue' /* webpackChunkName: "pages\\_username" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _3350fddf,
			name: "index"
		},
		{
			path: "/Login",
			component: _746ac0d6,
			name: "Login"
		},
		{
			path: "/dashboard",
			component: _e48b5d7e,
			name: "dashboard"
		},
		{
			path: "/dashboard/add-collection",
			component: _1d4b982a,
			name: "dashboard-add-collection"
		},
		{
			path: "/dashboard/add-link",
			component: _689059f2,
			name: "dashboard-add-link"
		},
		{
			path: "/:username",
			component: _859b397c,
			name: "username"
		}
    ],
    fallback: false
  })
}
