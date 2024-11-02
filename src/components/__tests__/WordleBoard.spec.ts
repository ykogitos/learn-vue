// import { test, expect, describe } from 'vitest'
// node need as we declare vitest as global

// see tsconfig.vitest.json
// see vitest.config.ts
import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {
  DEFEAT_MESSAGE,
  // MAX_GUESSES_COUNT,
  VICTORY_MESSAGE,
  WORD_SIZE
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
      await playerTypesAndSubmitsGuess('QWERT')
      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
    })

    test('no end-of-game message appears if the user has not yet made a guess', async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
  })

  describe('Rules for defining the word of the day', () => {
    // refactoring common function
    beforeEach(() => {
      console.warn = vi.fn()
    })

    test.each([
      {wordOfTheDay: "QWERT", reason: "word-of-the-day must be a real english word"},
      {wordOfTheDay: "tests", reason: "word-of-the-day must be all in puppercase"},
      {wordOfTheDay: "FLY", reason: "word-of-the-day must have 5 characters exactly"},
    ])("Since $reason: $wordOfTheDay is invalid, therefore a warning is emitted", async ({wordOfTheDay}) => {
      // do that:
      // const spy = vi.spyOn(console, "warn")
      // spy.mockImplementation(() => null)
      // or :
      // console.warn = vi.fn()

      mount(WordleBoard, {
        props: { wordOfTheDay }
      })
      expect(console.warn).toHaveBeenCalled()
    })

    test("No warning emitted if the word of the day is TESTS", async () => {
      // console.warn = vi.fn()

      mount(WordleBoard, {
        props: { wordOfTheDay }
      })
      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe("Player input", () => {
    test(`player guesses are limited to ${WORD_SIZE} letters`, async () => {
      await playerTypesAndSubmitsGuess(wordOfTheDay + 'EXTRA')
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
    test("player guesses can only be submitted if they are real words", async ()=> {
      await playerTypesAndSubmitsGuess('QWERT')
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
    test.todo("player guesses are not case sensitive")
    test.todo("player guesses can only contain letter")
  })
})
