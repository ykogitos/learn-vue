<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <button :class="['square']">{{ content }}</button>
</template>

<style lang="scss" scoped>
.square {
  border: none;
  border-radius: 0.2rem;
  margin: 0.1rem 0.1rem 0.1rem;
  height: calc(10vh - 2 * 0.1rem);
  width: calc(10vh - 2 * 0.1rem);
  transition: 0.875s ease-in-out;
  font-size: 1.7rem;
  &.X {
    color: #017991;
  }
  &.O {
    color: #910131;
  }
}

.win {
  background-color: var(--vt-c-green);
  transform: rotate(360deg);
  &.X,
  &.O {
    color: var(--vt-c-white);
  }
}
</style>
