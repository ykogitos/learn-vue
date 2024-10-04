<script setup lang="ts">
import TheAbout from '@/components/TheAbout.vue'
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <TheAbout>
      <strong>SLOT default</strong>Alpha
      <template #icon="{ hover }">
        <strong>SLOT #icon</strong>
        {{ hover ? '🦴' : '🫛' }}
        <strong>/SLOT</strong>
      </template>
      <template #test>
        <strong>SLOT #test</strong>
        Lorem ipsum dolor sit amet
        <strong>/SLOT</strong>
      </template>
      Fin de paragraphe<strong>/SLOT default</strong>
    </TheAbout>
  </div>
</template>

<style lang="scss" scoped>
strong {
  font-weight: bold;
  color: var(--vt-c-red);
  &:before {
    font-weight: bold;
    content: '<';
  }
  &:after {
    font-weight: bold;
    content: '>';
  }
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
