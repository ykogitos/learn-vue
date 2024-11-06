<script lang="ts" setup>
import { computed, ref } from 'vue'
import GuessInput from './GuessInput.vue'
import GuessView from './GuessView.vue'
import englishWords from '@/helpers/englishWordsWith5Letters.json'
import { DEFEAT_MESSAGE, MAX_GUESSES_COUNT, VICTORY_MESSAGE } from '@/helpers/settings-wordle'

const props = defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})

const randomWord = ref(props.wordOfTheDay)
const guessesSubmitted = ref<string[]>([])

const isGameOver = computed(() => {
  return (
    guessesSubmitted.value.length === MAX_GUESSES_COUNT ||
    guessesSubmitted.value.includes(randomWord.value)
  )
})

const countOfEmptyGuesses = computed(() => {
  const guessesRemaining = MAX_GUESSES_COUNT - guessesSubmitted.value.length

  return isGameOver.value ? guessesRemaining : guessesRemaining - 1
})

const getCurrentIntersection = (index: number) => {
  const randomWordSplit = randomWord.value.split('')
  const guessesSubmittedSplit = guessesSubmitted.value[index].split('')
  const corrects = randomWordSplit.map((l, i) => {
    if (l === guessesSubmittedSplit[i]) {
      return l
    }
    return ' '
  })

  const remainingWord = randomWordSplit.map((l, i) => {
    return l === corrects[i] ? ' ' : l
  })

  const remainingGuess = guessesSubmittedSplit.map((l, i) => {
    return l === corrects[i] ? ' ' : l
  })

  const intersection = remainingWord.filter((l) => remainingGuess.includes(l))

  return guessesSubmittedSplit.map((l, i) => {
    if (intersection.includes(l) && l !== randomWordSplit[i]) {
      intersection.splice(intersection.indexOf(l), 1)
      return l
    } else {
      return ' '
    }
  })
}

function newGame() {
  guessesSubmitted.value = []
  randomWord.value = englishWords[Math.floor(Math.random() * englishWords.length)]
}
</script>

<template>
  <h1>The wordle</h1>
  <div class="wrapper-wordle flex flex-align-center flex-justify-center">
    <ul>
      <li v-for="(guess, index) in guessesSubmitted" :key="`${index}-${guess}`">
        <guess-view
          :answer="randomWord"
          :guess="guess"
          :intersection="getCurrentIntersection(index)"
          type=""
        />
      </li>
      <li>
        <guess-input
          :disabled="isGameOver"
          @guess-submitted="(guess) => guessesSubmitted.push(guess)"
        />
      </li>
      <li v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
        <guess-view guess="" type="" :intersection="[]" />
      </li>
    </ul>
  </div>

  <div class="flex flex-column flex-align-center flex-justify-center">
    <div>
      <button v-if="isGameOver" class="end-of-game-message" @click="newGame">New Game</button>
    </div>

    <template v-if="isGameOver">
      <template v-if="guessesSubmitted.includes(randomWord)">
        <p class="end-of-game-message">{{ VICTORY_MESSAGE }}</p>
      </template>
      <template v-else>
        <p class="end-of-game-message">{{ DEFEAT_MESSAGE }}</p>
        <div class="end-of-game-message">
          The word was
          <div class="flex flex-align-center flex-justify-center">
            <span v-for="(letter, index) in randomWord" :key="`letter-${index}`">{{ letter }}</span>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
  border-bottom: solid black 0.1rem;
  margin-top: -0.1rem;
}

.wrapper-wordle {
  margin-top: 2rem;
}

.end-of-game-message {
  font-size: 1.1rem;
  animation: end-of-game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;

  & span {
    margin: 0.1rem;
    width: 1.9rem;
    height: 1.9rem;
    background-color: var(--vt-c-green);
    color: var(--vt-c-white);
    font-weight: bold;
    border-radius: 0.1rem;
  }
}

button.end-of-game-message {
  font-size: 0.75rem;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 0.25rem;
}

@keyframes end-of-game-message-animation {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }

  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>
