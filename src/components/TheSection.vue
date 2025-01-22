<script setup lang="ts">
import { computed, onMounted } from 'vue'

const props = defineProps<{
  bgColor: string
  radius: number
}>()

const radius = computed(() => props.radius + 'px')

const calcRadius = () =>
  computed(() => {
    // const r = props.radius
    const r = 50
    const positionX = r * (Math.random() - 0.5)
    const positionY = r * (Math.random() - 0.5)

    // const satRadius = (positionX * positionX + positionY + positionY) * 0.02
    const satRadius = 10
    return {
      left: 'calc(50% + ' + 1.5 * positionX + 'px)',
      top: 'calc(50% + ' + 1.5 * positionY + 'px)',
      'border-radius': satRadius + 'px',
      width: satRadius + 'px',
      height: satRadius + 'px'
    }
  })
</script>

<template>
  <section>
    <slot></slot>
    <div class="round absolute"></div>
    <div
      v-for="n in 10"
      :key="`${bgColor}-sat-${n}`"
      class="absolute sat"
      :class="`${props.bgColor} sat-${n}`"
      :style="calcRadius().value"
      :data-parallax="Math.random()"
    >
      {{ n }}
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: calc(100vw - 17px);
  overflow: hidden;
  position: relative;
  background-color: v-bind(bgColor);
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
  transition: all 0.2s;
  padding-top: 5px;
}

.absolute {
  position: absolute;
}
</style>
