<script lang="ts" setup>
  import { DEFEAT_MESSAGE, MAX_GUESSES_COUNT, VICTORY_MESSAGE } from "@/helpers/settings-wordle"
  import englishWords from "@/helpers/englishWordsWith5Letters.json"
  import { computed, ref } from "vue"
  import GuessInput from "./GuessInput.vue"
  import GuessView from "./GuessView.vue"

  const props = defineProps({
    wordOfTheDay: {
      type: String,
      required: true,
      validator: (wordGiven: string) => englishWords.includes(wordGiven)
    }
  })

  // const wordOfTheDay = ref("")
  // wordOfTheDay.value = englishWords[Math.floor(Math.random() * englishWords.length)]
  const randomWord = ref(props.wordOfTheDay)
  const guessesSubmitted = ref<string[]>([])

  const isGameOver = computed(() =>
    guessesSubmitted.value.length === MAX_GUESSES_COUNT
    || guessesSubmitted.value.includes(randomWord.value)
  )

  const countOfEmptyGuesses = computed(() => {
    const guessesRemaining = MAX_GUESSES_COUNT - guessesSubmitted.value.length

    return isGameOver.value ? guessesRemaining : guessesRemaining - 1
  })

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
        <guess-view :answer="randomWord" :guess="guess" type="" />
      </li>
      <li>
        <guess-input :disabled="isGameOver" @guess-submitted="guess => guessesSubmitted.push(guess)" />
      </li>
      <li v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
        <guess-view guess="" type="" />
      </li>
    </ul>
  </div>

  <div class="flex flex-column flex-align-center flex-justify-center">
    <div>
      <button v-if="isGameOver" class="end-of-game-message" @click="newGame">New Game</button>
    </div>

    <p v-if="isGameOver" class="end-of-game-message"
      v-text="guessesSubmitted.includes(randomWord) ? VICTORY_MESSAGE : DEFEAT_MESSAGE"></p>
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