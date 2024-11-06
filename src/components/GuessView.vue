<script lang="ts" setup>
  import { WORD_SIZE } from "@/helpers/settings-wordle"

  const props = defineProps<{
    guess: string,
    answer?: string,
    intersection: string[],
    type: string
  }>()

  function getFeedback(letterPosition: number): null | "correct" | "incorrect" | "almost" {
    if (!props.answer) {
      return null
    }

    const letterGuessed = props.guess[letterPosition]
    const letterExpected = props.answer[letterPosition]
    console.log(letterGuessed, props.intersection)
    let letterStatus: null | "correct" | "incorrect" | "almost" = null
    if (!props.answer.includes(letterGuessed)) {
      return "incorrect"
    }

    if (letterExpected === letterGuessed) {
      letterStatus = "correct"
    } else {
      letterStatus = props.guess[letterPosition] === props.intersection[letterPosition] ? "almost" : "incorrect"
    }
    return letterStatus
  }

</script>

<template>
  <ul class="word" :class="type">
    <li v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')" :key="`${letter}-${index}`" :data-letter="letter"
      :class="{ 'with-flips': answer, highlighted: type === 'current' && index === guess.length }"
      :data-letter-feedback="getFeedback(index)" class="letter" v-text="letter" />
  </ul>
</template>

<style lang="scss" scoped>
  ul {
    margin: 0;
    padding: 0;
  }

  .word {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 0.25rem;
  }

  .letter {
    --front-color: hsl(0, 0%, 99%);
    --back-color: hsl(0, 0%, 70%);
    background-color: var(--front-color);
    border: 1px solid hsl(0, 0%, 70%);
    border-radius: 0.2rem;
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: var(--vt-c-black-mute);
    font-weight: bold;
  }

  .highlighted {
    border-width: 2px;
    border-color: var(--vt-c-green)
  }

  li:not([data-letter=" "]) {
    animation: pop 100ms;
  }

  @keyframes pop {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.4);
    }
  }

  [data-letter-feedback=correct] {
    --back-color: var(--vt-c-green);
    --border-color: var(--vt-c-green);

  }

  [data-letter-feedback=almost] {
    --back-color: var(--vt-c-orange);
    --border-color: var(--vt-c-orange);
  }

  [data-letter-feedback=incorrect] {
    --back-color: hsl(0, 0%, 70%);
  }


  $maxWordSize: 5;

  @for $i from 1 through $maxWordSize {
    .with-flips:nth-of-type(#{$i}) {
      animation: flip-card 300ms forwards;
      animation-delay: #{250*$i}ms;
    }
  }

  @keyframes flip-card {
    0% {
      transform: rotateY(0);
      background-color: var(--front-color);
    }

    49% {
      background-color: var(--front-color);
    }

    50% {
      transform: rotateY(-90deg);
      background-color: var(--back-color);
    }

    100% {
      transform: rotateY(0);
      background-color: var(--back-color);
      border-color: var(--border-color);
      color: var(--vt-c-white-soft);
    }
  }
</style>