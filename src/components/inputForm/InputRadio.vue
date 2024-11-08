<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{
  inputRadioValues: {
    id: string
    label: string
    value: string
    selected: boolean
  }[]
  name: string
  legend: string
  required: boolean
}>()

const selectedId = ref('')
const radios = ref(props.inputRadioValues)

const selectedRadios = computed(() => {
  return radios.value.map(({ ...r }) => {
    r.selected = r.id === selectedId.value
    return r
  })
})

const emit = defineEmits(['update:value'])
const childValue = ref()
</script>
<template>
  <fieldset :class="{ required: required }">
    <legend>{{ legend }}</legend>
    <div class="flex flex-row flex-align-center" role="radiogroup">
      <div class="input-radio" v-for="v in selectedRadios" :key="v.id">
        <label :for="v.id">{{ v.label }}</label>
        <input
          type="radio"
          :id="v.id"
          :name="name"
          :value="v.value"
          :aria-checked="v.selected"
          :required="required"
          v-model="childValue"
          @click="selectedId = v.id"
          @input="emit('update:value', $event)"
        />
      </div>
    </div>
  </fieldset>
</template>
