<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  inputRadioValues: {
    id: string
    label: string
    value: string
  }[]
  name: string
}>()

const emit = defineEmits(['update:value'])
const childValue = ref()
</script>
<template>
  <p>Child {{ childValue }}</p>
  <template v-for="v in inputRadioValues" :key="v.id">
    <label :for="v.id">{{ v.label }}</label>
    <input
      type="radio"
      :id="v.id"
      :name="name"
      :value="v.value"
      v-model="childValue"
      @input="emit('update:value', $event)"
    />
  </template>
</template>
