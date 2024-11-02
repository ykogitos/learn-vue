<script setup lang="ts">
  import { DEFEAT_MESSAGE, MAX_GUESSES_COUNT, VICTORY_MESSAGE } from '@/helpers/settings-wordle'
  import englishWords from '@/helpers/englishWordsWith5Letters.json'

  import { ref } from 'vue';
  // import { computed, ref } from 'vue';
  const props = defineProps({
    wordOfTheDay: {
      type: String,
      required: true,
      validator: (wordGiven: string) => wordGiven.length === 5
        && wordGiven.toUpperCase() === wordGiven
        && englishWords.includes(wordGiven)
    }
  })

  const guessInProgress = ref('')
  const guessSubmitted = ref('')
</script>
<template>
  <main>
    <h1>The Wordle Board</h1>
    <p v-if="guessSubmitted.length > 0" v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE" />
    <input type="text" v-model="guessInProgress" @keydown.enter="guessSubmitted = guessInProgress">
    <p>Word of the day: {{ props.wordOfTheDay }}</p>
  </main>
</template>