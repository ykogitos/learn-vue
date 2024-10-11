<script setup lang="ts">
import { ref } from 'vue'
import InputRadio from '@/components/InputRadio.vue'
import InputCb from '@/components/InputCb.vue'

const inputRadioValues: { id: string; label: string; value: string }[] = [
  {
    id: 'civility-mme',
    label: 'Mme',
    value: 'mme'
  },
  {
    id: 'civility-m',
    label: 'M.',
    value: 'm'
  }
]

const civility = ref()
const cbNumber = ref()
</script>
<template>
  <main>
    <h1>The Form</h1>
    <form class="form">
      <fieldset>
        <div id="civility">
          <p>parent: {{ civility }}</p>
          <input-radio
            :inputRadioValues="inputRadioValues"
            name="civility"
            @update:value="
              ($event) => {
                civility = $event.target.value
              }
            "
          />
        </div>
      </fieldset>
      <fieldset>
        <p>parent: {{ cbNumber }}</p>
        <input-cb
          @update:value="
            (value) => {
              cbNumber = value.replace(/ /g, '')
            }
          "
        />
      </fieldset>
      <fieldset>
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
      </fieldset>
    </form>
  </main>
</template>
