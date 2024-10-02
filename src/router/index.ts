import { createRouter, createWebHistory } from 'vue-router'
import type { LinkInterface } from '@/interfaces'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'HomePage',
      description: 'welcome to the home page'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/AboutView.vue'),
    meta: {
      title: 'AboutPage',
      description: 'welcome to the About page'
    }
  },
  {
    path: '/foo',
    name: 'foo',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'FooPage',
      description: 'welcome to the Foo page'
    }
  }
]

export const paths = routes.map((route) => ({
  path: route.path,
  name: route.name.charAt(0).toUpperCase() + route.name.slice(1)
})) as LinkInterface[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const { title, description } = to.meta as { title: string; description: string }
  const defaultTitle = 'Default Title'
  const defaultDescription = 'Vue page'
  document.title = title || defaultTitle
  console.log('description', description)
  const descriptionElement = document.querySelector('head meta[name="description"]')
  if (descriptionElement) {
    descriptionElement.setAttribute('content', description || defaultDescription)
  } else {
    const metaDescriptionElement = document.createElement('meta')
    metaDescriptionElement.setAttribute('name', 'description')
    metaDescriptionElement.setAttribute('content', description || defaultDescription)
    document.querySelector('head')?.appendChild(metaDescriptionElement)
  }
})

export default router
