import { test, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SidebarMenu from '../nav/SidebarMenu.vue'
import type { LinkInterface } from '@/interfaces'
import router from '../../router'

test('SidebarMenu First Link is active', async () => {
  const links: LinkInterface[] = router.getRoutes().map((route) => {
    let name = route.name
    if (typeof name === 'string') {
      name = name.charAt(0).toUpperCase() + name.slice(1)
    }
    return {
      name: <string>name,
      path: <string>route.path
    }
  })

  router.push('/')
  await router.isReady()
  const wrapper = mount(SidebarMenu, {
    props: {
      links
    },
    global: {
      plugins: [router]
    }
  })

  const classes = wrapper.find('ul li:nth-child(1) a').classes()
  expect(classes).toEqual(['router-link-active', 'router-link-exact-active'])
})
