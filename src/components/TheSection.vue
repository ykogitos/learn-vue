<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Parallax } from '@/helpers/parallax'

const props = defineProps<{
  bgColor: string
  radius: number
}>()

const radius = computed(() => props.radius + 'px')

const calcRadius = () =>
  computed(() => {
    return {
      left: 'calc(50% + ' + 1.5 * props.radius * (Math.random() - 0.5) + 'px)',
      top: 'calc(50% + ' + 1.5 * props.radius * (Math.random() - 0.5) + 'px)',
      'border-radius': 5 + 'px',
      width: 5 + 'px',
      height: 5 + 'px'
    }
  })
</script>

<template>
  <section>
    <slot></slot>
    <div class="round absolute"></div>
    <div
      v-for="n in 100"
      :key="`sat-${n}`"
      class="absolute sat"
      :class="`${props.bgColor} sat-${n}`"
      :style="calcRadius().value"
      :data-parallax="Math.random()"
    ></div>
  </section>
</template>

<style lang="scss" scoped>
section {
  height: 100vh;
  position: relative;
  background-color: v-bind(bgColor);
}

h1,
h2 {
  text-align: center;
  position: fixed;
  top: 0;
}

.round {
  border-radius: 50%;
  top: calc(50% - v-bind(radius) / 2);
  left: calc(50% - v-bind(radius) / 2);
  width: v-bind(radius);
  height: v-bind(radius);
  background-color: white;
}

.sat {
  background-color: black;
  // z-index: 100;
}

.absolute {
  position: absolute;
}
</style>
