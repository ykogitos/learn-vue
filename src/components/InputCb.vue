<script setup lang="ts">
import { ref, computed } from 'vue'
import { cbSplit, cbBankIdentifier } from '@/helpers/utils'
import type { BankDataInterface } from '@/interfaces'
const emit = defineEmits(['update:value'])
const cbNumber = ref('')
const bankData = ref<BankDataInterface>({
  name: '',
  l: 16,
  l2: 16
})
const inputLenght = computed(
  () =>
    Math.max(bankData.value.l, bankData.value.l2) +
    Math.floor(Math.max(bankData.value.l, bankData.value.l2) / 4) -
    1
)

const handleKeyUp = ($event: KeyboardEvent) => {
  const el = $event.target as HTMLInputElement
  if (Number.isNaN(parseInt(el.value[el.value.length - 1]))) {
    el.value = el.value.substring(0, el.value.length - 1)
  }
  cbNumber.value = cbSplit(el.value)
  bankData.value = cbBankIdentifier(el.value)
  emit('update:value', cbNumber.value)
}

const clearInput = () => {
  cbNumber.value = ''
  bankData.value = cbBankIdentifier('')
  emit('update:value', cbNumber.value)
}
</script>
<template>
  <p>Child: {{ cbNumber }}</p>
  <label>CB</label>
  <input type="text" :maxlength="inputLenght" v-model="cbNumber" @:keyup.prevent="handleKeyUp" />
  <button @click.prevent="clearInput">Clear</button>
  <p>b {{ bankData }}</p>
  <p>input: {{ cbNumber.length }}, Bank: {{ bankData.name }}, digit: {{ inputLenght }}</p>
</template>
