<script setup lang="ts">
import TheSection from '@/components/TheSection.vue'
import { Parallax } from '@/helpers/parallax'
import { onMounted } from 'vue'
// onMounted(() => Parallax.bind())
</script>

<template>
  <main>
    <TheSection bg-color="yellow" :radius="80">
      <h1>Section 1</h1>
    </TheSection>
    <TheSection bg-color="purple" :radius="110">
      <h1>Section 2</h1>
    </TheSection>
    <TheSection bg-color="cyan" :radius="50">
      <h1>Section 3</h1>
    </TheSection>
    <TheSection bg-color="red" :radius="50">
      <h1>Section 3</h1>
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
  text-align: center;
  position: sticky;
  top: 0;
}
</style>
