// import { test, expect, describe } from 'vitest'
// node need as we declare vitest as global

// see tsconfig.vitest.json
// see vitest.config.ts
import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {
  DEFEAT_MESSAGE,
  // MAX_GUESSES_COUNT,
  VICTORY_MESSAGE
  // WORD_SIZE
} from '@/helpers/settings-wordle'

describe('WordleBoard', () => {
  const wordOfTheDay = 'TESTS'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordleBoard, {
      props: { wordOfTheDay }
    })
  })

  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
   

    const guessInput = wrapper.find('input[type=text]')
    await guessInput.setValue('TESTS')
    await guessInput.trigger('keydown.enter')
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test('a defeat message appears when the user make an incorrect answer', async () => {

    const guessInput = wrapper.find('input[type=text]')
    await guessInput.setValue('WRONG')
    await guessInput.trigger('keydown.enter')
    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })

  test('no end-of-game message appears if the user has not yet made a guess', async () => {

    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })
})
