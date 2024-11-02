<script setup lang="ts">
  import { DEFEAT_MESSAGE, MAX_GUESSES_COUNT, VICTORY_MESSAGE } from '@/helpers/settings-wordle'
  import englishWords from '@/helpers/englishWordsWith5Letters.json'
  // import { computed, ref } from 'vue';
  const props = defineProps({
    wordOfTheDay: {
      type: String,
      required: true,
      validator: (wordGiven: string) => englishWords.includes(wordGiven)
    }
  })
</script>
<template>
  <main>
    <h1>The Wordle Board</h1>
    <p>{{ VICTORY_MESSAGE }}</p>
    <p>{{ DEFEAT_MESSAGE }}</p>
    <input type="text">
    <p>Word of the day: {{ props.wordOfTheDay }}</p>
  </main>
</template>