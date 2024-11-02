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

  async function playerTypesGuess(guess: string) {
    await wrapper.find('input[type=text]').setValue(guess)
  }

  async function playerPressesEnter() {
    await wrapper.find('input[type=text]').trigger('keydown.enter')
  }

  async function playerTypesAndSubmitsGuess(guess: string) {
    await playerTypesGuess(guess)
    await playerPressesEnter()
  }

  describe('End of game messages', () => {
    test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
      await playerTypesAndSubmitsGuess(wordOfTheDay)
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test('a defeat message appears when the user make an incorrect answer', async () => {
      await playerTypesAndSubmitsGuess('WRONG')
      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
    })

    test('no end-of-game message appears if the user has not yet made a guess', async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
  })

  describe('Rules for defining the word of the day', () => {
    test('If the word of the days doesn`t not have exactly 5 chracters, a warning is emitted', async () => {
      // do that:
      // const spy = vi.spyOn(console, "warn")
      // spy.mockImplementation(() => null)
      // or :
      console.warn = vi.fn()
      mount(WordleBoard, {
        props: { wordOfTheDay: 'FLY' }
      })
      expect(console.warn).toHaveBeenCalled()
    })

    test('If the word of the day is not all in uppercase, a warning is emitting', async () => {
      console.warn = vi.fn()
      mount(WordleBoard, {
        props: { wordOfTheDay: 'tests' }
      })
      expect(console.warn).toHaveBeenCalled()
    })

    test('If the word of the day is a real uppercase english word with 5 caracters', async () => {
      console.warn = vi.fn()
      mount(WordleBoard, {
        props: { wordOfTheDay: 'TESTS' }
      })
      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe("Player input", () => {
    test.todo("player guesses are limited to 5 letters")
    test.todo("player guesses can only be submitted if they are real words")
    test.todo("player guesses are not case sensitive")
    test.todo("player guesses can only contain letter")
  })
})
