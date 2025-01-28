<script setup lang="ts">
import TheSection from '@/components/TheSection.vue'
import { Parallax } from '@/helpers/parallax'
import { onMounted } from 'vue'
// onMounted(() => Parallax.bind())
</script>

<template>
  <main>
    <TheSection bg-color="yellow" :radius="80">
      <h1>This is Yellow</h1>
      <div
        class="flex flex-column flex-align-center flex-justify-center"
        style="position: absolute; top: 0; height: 100vh; width: 100vw"
      >
        <p style="text-align: center; font-size: 4rem">Welcome to the parallax!</p>
        <p>Lorem ipsum dolor sit amet.<br /><strong>What else?</strong></p>
      </div>
    </TheSection>
    <TheSection bg-color="purple" :radius="110" :use-parallax="true">
      <h1>Section 2</h1>
    </TheSection>
    <TheSection bg-color="cyan" :radius="50" :use-parallax="true">
      <h1>Section 3</h1>
    </TheSection>
    <TheSection bg-color="red" :radius="50" :use-parallax="true">
      <h1>Section 4</h1>
    </TheSection>
    <TheSection bg-color="green" :radius="200" :use-parallax="true">
      <h1>Section 5</h1>
    </TheSection>
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: calc(100vw - 17px);
}

h1,
h2 {
  z-index: 20;
  text-align: center;
  position: sticky;
  top: 0;
}
</style>
