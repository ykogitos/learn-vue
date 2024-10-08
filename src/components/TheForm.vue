<script setup lang="ts"></script>
<template>
  <main>
    <h1>The Form</h1>
    <form class="form">
      <fieldset>
        <div id="civility">
          <label for="civility-mme">Mme</label>
          <input type="radio" id="civility-mme" name="civility" value="Mme" />

          <label for="civility-m">M.</label>
          <input type="radio" id="civility-m" name="civility" value="M." />
        </div>
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
