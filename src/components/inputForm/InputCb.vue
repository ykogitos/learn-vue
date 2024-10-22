<script setup lang="ts">
import { ref, computed } from 'vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconFail from '@/components/icons/IconFail.vue'
import { cbBankIdentifier, luhnCheck, cbPattern } from '@/helpers/utils'
import type { BankDataInterface } from '@/interfaces'

// 5135382004617816 MC

// 4990410100009898 Visa
// 4979930115040005
// 4979938770443448

const emit = defineEmits(['update:value'])
const cbNumber = ref('')
const isValid = ref(false)
const bankData = ref<BankDataInterface>({
  name: 'default',
  pattern: '',
  spaces: 0,
  l: 5
})
const inputLenght = computed(() => bankData.value.l + bankData.value.spaces)

const manageData = (cbValue: string) => {
  cbNumber.value = cbPattern(
    cbValue,
    bankData.value.pattern,
    bankData.value.l + bankData.value.spaces
  )
  bankData.value = cbBankIdentifier(cbValue)
  isValid.value = luhnCheck(cbNumber.value, bankData.value.l)
  emit('update:value', cbNumber.value)
}

const handleKeyUp = ($event: KeyboardEvent) => {
  const el = $event.target as HTMLInputElement
  if (Number.isNaN(parseInt(el.value[el.value.length - 1]))) {
    el.value = el.value.substring(0, el.value.length - 1)
  }
  manageData(el.value)
}

const clearInput = () => {
  manageData('')
}
</script>
<template>
  <p>Child: {{ cbNumber }}</p>
  <div class="flex">
    <label for="cb-number">CB</label>
    <input
      id="cb-number"
      type="text"
      :maxlength="inputLenght"
      v-model="cbNumber"
      @:keyup.prevent="handleKeyUp"
    />
    {{ inputLenght }}
    <IconCheck class="svg" :class="{ checked: isValid }" v-if="isValid" />
    <IconFail class="svg" :class="{ failed: !isValid }" v-if="!isValid" />
  </div>

  <button @click.prevent="clearInput">Clear</button>
  <p>b {{ bankData }}</p>
  <p>input: {{ cbNumber.length }}, Bank: {{ bankData.name }}, digit: {{ inputLenght }}</p>
</template>

<style lang="scss" scoped>
.svg {
  width: 1.6rem;
  height: 1.6rem;
  &.checked {
    fill: var(--vt-c-green);
  }
  &.failed {
    fill: var(--vt-c-red);
  }
}
</style>
