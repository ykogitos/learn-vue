<script setup lang="ts">
import { ref } from 'vue'
const done = ref(false)
const hover = ref(false)
</script>

<template>
  <div>
    <input type="checkbox" v-model="done" name="done" />
    <span :class="{ done }">
      <slot></slot>
    </span>
  </div>
  <div><i>TheAbout</i> Original content</div>
  <div>
    <slot name="test"></slot>
  </div>
  <div @mouseover="($event) => (hover = true)" @mouseleave="($event) => (hover = false)">
    <slot name="icon" :hover="hover" random="hello"> 🫛 </slot>
  </div>
</template>

<style lang="scss" scoped>
.done {
  color: var(--vt-c-red);
  text-decoration: line-through;
}
</style>
