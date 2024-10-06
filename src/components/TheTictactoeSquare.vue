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
  border: 1px solid var(--vt-c-black);
  margin-top: -1px;
  margin-right: -1px;
  height: 10vh;
  width: 10vh;
  transition: 1s ease-in-out;
}

.win {
  background-color: var(--vt-c-green);
  transform: rotate(360deg);
  color: var(--vt-c-white);
}
</style>
