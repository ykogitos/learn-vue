<script setup lang="ts">
import WordleBoard from '@/components/WordleBoard.vue'
import englishWords from '@/helpers/englishWordsWith5Letters.json'
const word = englishWords[Math.floor(Math.random() * englishWords.length)]
</script>

<template>
  <main>
    <WordleBoard :wordOfTheDay="word" />
  </main>
</template>
