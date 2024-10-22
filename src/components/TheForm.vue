<script setup lang="ts">
import { ref } from 'vue'
import InputRadio from '@/components/inputForm/InputRadio.vue'
import InputCb from '@/components/inputForm/InputCb.vue'

const inputRadioValues: { id: string; label: string; value: string; selected: boolean }[] = [
  {
    id: 'radio-1',
    label: '1',
    value: '1',
    selected: false
  },
  {
    id: 'radio-2',
    label: '2',
    value: '2',
    selected: false
  },
  {
    id: 'radio-3',
    label: '3',
    value: '3',
    selected: false
  }
]

const required = ref(true)

const formData = ref({
  civility: '',
  cbNumber: ''
})
</script>
<template>
  <main>
    <h1>The Form</h1>
    <form class="form">
      <fieldset>
        <div id="civility">
          <input-radio
            :inputRadioValues="inputRadioValues"
            name="civility"
            legend="Radio form"
            :required="required"
            @update:value="
              ($event) => {
                formData.civility = $event.target.value
              }
            "
          />
        </div>
      </fieldset>
      <fieldset>
        <input-cb
          @update:value="
            (value) => {
              formData.cbNumber = value.replace(/ /g, '')
            }
          "
        />
      </fieldset>
      <!-- <fieldset>
        <div>
          <label for="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Firstname"
            autocomplete="given-name"
          />
        </div>
        <div>
          <label for="lastname">Lastname</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Lastname"
            autocomplete="family-name"
          />
        </div>
        <div>
          <label for="address-line1">Address</label>
          <input
            type="text"
            id="address-line1"
            name="address-line1"
            placeholder="Address"
            autocomplete="address-line1"
          />
        </div>
        <div>
          <label for="address-line2">Complementary address</label>
          <input
            type="text"
            id="address-line2"
            name="address-line2"
            placeholder="Complementary Address"
            autocomplete="address-line2"
          />
        </div>
        <div>
          <label for="postal-code">Postal code</label>
          <input
            type="text"
            id="postal-code"
            name="postal-code"
            placeholder="Postal Code"
            autocomplete="postal-code"
          />
        </div>
      </fieldset> -->
    </form>
    <div>
      <p>{{ formData }}</p>
    </div>
  </main>
</template>
