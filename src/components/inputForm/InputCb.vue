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
  logo: '',
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
    <label for="cb-number">Credit card:</label>
    <div class="wrapper-cb-number">
      <div class="logo-cb" :class="bankData.logo"></div>
      <input
        id="cb-number"
        type="text"
        :maxlength="inputLenght"
        v-model="cbNumber"
        @:keyup.prevent="handleKeyUp"
      />
    </div>

    {{ inputLenght }}
    <IconCheck class="svg" :class="{ checked: isValid }" v-if="isValid" />
    <IconFail class="svg" :class="{ failed: !isValid }" v-if="!isValid" />
  </div>

  <button @click.prevent="clearInput">Clear</button>
  <p>{{ bankData }}</p>
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

.wrapper-cb-number {
  position: relative;
}

input {
  height: 40px;
  padding-left: 54px;
  background-color: #f9f9f9;
  border: 1px solid #aaa;
  border-radius: 3px;
  &:focus {
    outline: 2px solid #707070;
  }
}

.logo-cb {
  position: absolute;
  left: 3px;
  top: 3px;
  display: inline-block;
  width: 52px;
  height: 34px;
  background-image: url('/images/logo_cb.png');
  background-position: 0 -228px;
  background-color: transparent;
  background-size: cover;

  &.jcb {
    background-position-y: 0;
  }

  &.discover {
    background-position-y: -32px;
  }

  &.diner {
    background-position-y: -66px;
  }

  &.mastercard {
    background-position-y: -98px;
  }

  &.american-express {
    background-position-y: -130px;
  }

  &.visa {
    background-position-y: -162px;
  }

  &.visa-electron {
    background-position-y: -196px;
  }
}
</style>
