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
@use 'sass:math';

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

/**
  * Miscellanous function to adapt JPG sprite
  * @WIDTH: int
  * @$HEIGHT: int
  */

$WIDTH: 124px;
$HEIGHT: 78px;
$RATIO: calc($WIDTH / $HEIGHT);

$w: calc(40px - 8px);
$h: math.floor(calc($w / $RATIO));

@function relativeOffset($position) {
  @return math.floor(calc($position * $HEIGHT * -1) * calc($h / $HEIGHT));
}

input {
  height: calc($h + 6px);
  padding-left: calc($w + 8px);
  background-color: #f9f9f9;
  border: 1px solid #aaa;
  border-radius: 2px;

  &:focus {
    outline: 1px solid #aaa;
  }
}

.logo-cb {
  position: absolute;
  left: 3px;
  top: 3px;
  display: inline-block;
  width: $w;
  height: $h;
  background-image: url('/images/logo_cb.png');
  background-position: 0 relativeOffset(7);
  background-color: transparent;
  background-size: cover;

  &.jcb {
    background-position-y: relativeOffset(0);
  }

  &.discover {
    background-position-y: relativeOffset(1);
  }

  &.diner {
    background-position-y: relativeOffset(2);
  }

  &.mastercard {
    background-position-y: relativeOffset(3);
  }

  &.american-express {
    background-position-y: relativeOffset(4);
  }

  &.visa {
    background-position-y: relativeOffset(5);
  }

  &.visa-electron {
    background-position-y: relativeOffset(6);
  }
}
</style>
