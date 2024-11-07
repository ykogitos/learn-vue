<script lang="ts" setup>
import { WORD_SIZE } from '@/helpers/settings-wordle'
import englishWords from '@/helpers/englishWordsWith5Letters.json'
import { computed, nextTick, onMounted, ref } from 'vue'
import GuessView from './GuessView.vue'

withDefaults(defineProps<{ disabled?: boolean }>(), {
  disabled: false // default value
})

const guessInProgress = ref<string | null>(null)
const hasFailedValidation = ref<boolean>(false)
const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  'guess-submitted': [guess: string]
}>()

const formattedGuessInProgress = computed<string>({
  get() {
    return guessInProgress.value ?? ''
  },
  set(rawValue: string) {
    guessInProgress.value = null

    guessInProgress.value = rawValue
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, '')
  }
})

function onSubmit() {
  if (!englishWords.includes(formattedGuessInProgress.value)) {
    hasFailedValidation.value = true
    setTimeout(() => (hasFailedValidation.value = false), 500)

    return
  }

  emit('guess-submitted', formattedGuessInProgress.value)
  guessInProgress.value = null
}

function inputFocus():void {
  nextTick(() => {
    inputRef?.value?.focus()
  })
}

defineExpose({
  inputFocus
})

onMounted(() => {
  inputFocus()
})
</script>

<template>
  <guess-view
    v-if="!disabled"
    :class="{ shake: hasFailedValidation }"
    :guess="formattedGuessInProgress"
    type="current"
    :intersection="[]"
  />

  <input
    ref="inputRef"
    class="wordle"
    v-model="formattedGuessInProgress"
    :maxlength="WORD_SIZE"
    :disabled="disabled"
    aria-label="Make your guess for the word of the day!"
    @blur="({ target }) => (target as HTMLInputElement).focus()"
    type="text"
    @keydown.enter="onSubmit"
  />
</template>

<style scoped>
input {
  position: absolute;
  opacity: 0;
}

.shake {
  animation: shake;
  animation-duration: 100ms;
  animation-iteration-count: 2;
}

@keyframes shake {
  0% {
    transform: translateX(-2%);
  }

  25% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(2%);
  }

  75% {
    transform: translateX(0);
  }
}
</style>
