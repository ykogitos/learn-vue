<script setup lang="ts">
import { ref } from 'vue'
import { cbSplit } from '@/helpers/utils'
const emit = defineEmits(['update:value'])
const cbNumber = ref('')

const handleKeyUp = ($event: KeyboardEvent) => {
  const el = $event.target as HTMLInputElement
  cbNumber.value = cbSplit(el.value)
  emit('update:value', cbNumber.value)
}
</script>
<template>
  <p>Child: {{ cbNumber }}</p>
  <label>CB</label>
  <input type="text" v-model="cbNumber" @:keyup.prevent="handleKeyUp" />
</template>
