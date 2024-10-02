import { test, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '../../router'
import App from '../../App.vue'
import { nextTick } from 'vue'
import { sleep } from '../helpers/tests'

describe('App Navigation', async () => {
  router.push('/')
  await router.isReady()

  const wrapper = mount(App, {
    attachTo: document.body,
    global: {
      plugins: [router]
    }
  })

  test('On starting, sidebar is not expanded', () => {
    expect(wrapper.get('aside').classes()).toEqual(['flex', 'transition-in-out'])
  })

  test('By clicking on the arrow sidebar is expanded', async () => {
    const btn = wrapper.get('.arrow-ctn')
    await btn.trigger('click')
    expect(wrapper.get('aside').classes()).toEqual(['flex', 'transition-in-out', 'expanded'])
  })

  test('The firstlink should be active', () => {
    const firstLink = wrapper.get('aside ul li:nth-child(1) a')
    expect(firstLink.classes()).toEqual(['router-link-active', 'router-link-exact-active'])
  })

  test('By clicking on the second link, it should become active and sidebar is folded', async () => {
    const secondLink = wrapper.get('aside ul li:nth-child(2) a')
    await nextTick()
    await secondLink.trigger('click')
    await sleep(100)
    expect(secondLink.classes()).toEqual(['router-link-active', 'router-link-exact-active'])
    expect(wrapper.get('aside').classes()).toEqual(['flex', 'transition-in-out'])
  })
})
