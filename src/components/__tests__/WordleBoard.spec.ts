// import { test, expect, describe } from 'vitest'
// node need as we declare vitest as global

// see tsconfig.vitest.json
// see vitest.config.ts
import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {
  // DEFEAT_MESSAGE,
  // MAX_GUESSES_COUNT,
  VICTORY_MESSAGE,
  // WORD_SIZE
} from '@/helpers/settings-wordle'

describe('WordleBoard', () => {
  const wordOfTheDay = 'TESTS'
  let wrapper: ReturnType<typeof mount>

  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
    wrapper = mount(WordleBoard, {
      props: { wordOfTheDay }
    })

    const guessInput = wrapper.find("input[type=text")
    await guessInput.setValue('TESTS')
    await guessInput.trigger('keydown.enter')
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })
})
