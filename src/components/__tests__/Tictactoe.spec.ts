// import { test, expect, describe } from 'vitest'
// node need as we declare vitest as global

// see tsconfig.vitest.json
// see vitest.config.ts
import { mount } from '@vue/test-utils'
import TheTictactoe from '../TheTictactoe.vue'
import { sleep } from '@/helpers/tests'

describe('The Tic Tac Toe', () => {
  const wrapper = mount(TheTictactoe)

  test('Initial game is a 3x3 squares', () => {
    expect(wrapper.get('h1').text()).toEqual('Tic Tac Toe')
    expect(wrapper.findAll('.game-ctn button').length).toBe(9)
  })

  test('Changing size game by 5x5 and print 25 squares', async () => {
    const btnSelectedGame = wrapper.find('.radio-game:nth-child(3) input')
    expect(btnSelectedGame.attributes('value')).toEqual('25')
    await btnSelectedGame.trigger('click')
    await sleep(1000)
    expect(wrapper.findAll('.game-ctn button').length).toBe(25)
  })

  test('Playing with the 3x3 game - Winner is X or O', async () => {
    const btn3x3 = wrapper.find('.radio-game:nth-child(1) input')
    expect(btn3x3.attributes('value')).toEqual('9')
    await btn3x3.trigger('click')
    expect(wrapper.findAll('.game-ctn button').length).toBe(9)
    // playing
    const positions = [5, 3, 2, 7, 8]
    for (const position of positions) {
      const game = wrapper.get('.game-ctn .square:nth-child(' + position + ')')
      await game.trigger('click')
      await sleep(250)
    }
    expect(wrapper.get('.board').text()).toContain('Winner is')
  })

  test('Playing with the 3x3 game - No winner', async () => {
    const btn3x3 = wrapper.find('.radio-game:nth-child(1) input')
    await btn3x3.trigger('click')
    // playing
    const positions = [1, 2, 3, 5, 4, 6, 8, 7, 9]
    for (const position of positions) {
      const game = wrapper.get('.game-ctn .square:nth-child(' + position + ')')
      await game.trigger('click')
      await sleep(100)
    }

    expect(wrapper.get('.board').text()).toContain('Free squares: 1 / 9')
    expect(wrapper.get('.board').text()).toContain('No winner')
  })
})
