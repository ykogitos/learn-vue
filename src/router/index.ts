import { createRouter, createWebHistory } from 'vue-router'
import type { LinkInterface } from '@/interfaces'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'HomePage | Kgt app',
      description: 'welcome to the home page'
    }
  },
  {
    path: '/tic-tac-toe',
    name: 'Tic Tac Toe',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '@/views/TictactoeView.vue'),
    meta: {
      title: 'Tic Tac Toe | Kgt app',
      description: 'The Tic Tac Toe'
    }
  },
  {
    path: '/the-wordle',
    name: 'the wordle',
    component: () => import('@/views/WordleView.vue'),
    meta: {
      title: 'The Wordle | Kgt app',
      description: 'A TDD app'
    }
  },
  {
    path: '/the-slider',
    name: 'the slider',
    component: () => import('@/views/SliderView.vue'),
    meta: {
      title: 'The Slider | Kgt app',
      description: 'Using scroll snap'
    }
  },
  {
    path: '/the-form',
    name: 'the form',
    component: () => import('@/views/FormView.vue'),
    meta: {
      title: 'The form | Kgt app',
      description: 'Playing with form'
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
      title: 'AboutPage | Kgt app',
      description: 'welcome to the About page'
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
