import { createRouter, createWebHistory } from 'vue-router'
import type { LinkInterface } from '@/interfaces'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/AboutView.vue')
  },
  {
    path: '/foo',
    name: 'Foo',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
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

export default router
