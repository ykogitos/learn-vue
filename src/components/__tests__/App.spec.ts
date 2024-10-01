import { test, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '../../router'
import App from '../../App.vue'
import { nextTick, onUnmounted } from 'vue'

describe('App Navigation', async () => {
  router.push('/')
  await router.isReady()
  const wrapper = mount(App, {
    attachTo: document.body,
    global: {
      plugins: [router]
    }
  })

  test('Aside is node expanded', () => {
    console.log('1- Aside is node expanded', wrapper.get('aside').classes())
    expect(wrapper.get('aside').classes()).toEqual(['flex', 'transition-in-out'])
  })

  test('First Aside Link is active', () => {
    const classes = wrapper.get('aside ul li:nth-child(1) a').classes()
    console.log('2- First Aside Link is active', classes)
    expect(classes).toEqual(['router-link-active', 'router-link-exact-active'])
  })

  // const arrowCtn = wrapper.get('aside').get('.arrow-ctn')

  test("On arrow's click, Aside should be expanded", async () => {
    await wrapper.get('aside .arrow-ctn').trigger('click')
    // await nextTick()
    console.log('3- aside.classes()', wrapper.get('aside').classes())
    expect(wrapper.get('aside').classes()).toEqual(['flex', 'transition-in-out', 'expanded'])
  })

  // await wrapper.get('aside .arrow-ctn').trigger('click')
  // await nextTick()

  // await aside.find('ul li:nth-child(2) a').trigger('click')
  // await nextTick()
  // test('Second Aside Link is active', () => {
  //   const btn = wrapper.find('aside ul li:nth-child(2) a')
  //   console.log('aside', aside.attributes())
  //   console.log('arrowCtn', arrowCtn.attributes())
  //   console.log('btn', btn.attributes())
  //   expect(btn.classes()).toHaveLength(2)
  // })

  wrapper.unmount()
})
