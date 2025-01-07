<script lang="ts" setup>
import { ref } from 'vue'
import ResponsivePicture from './images/ResponsivePicture.vue'

const helloSlider = ref('Hello Slider')

const pics = [
  'PIC_01',
  'PIC_02',
  'PIC_03',
  'PIC_04',
  'PIC_05',
  'PIC_06',
  'PIC_07',
  'PIC_08',
  'PIC_09',
  'PIC_10',
  'PIC_11'
]

// const pics = ['PIC_01', 'PIC_02']
const widthRef = 250

const width = ref(widthRef)
const height = ref(Math.floor((widthRef * 3) / 4))
const folder = ref('/images/slider')
</script>

<template>
  <h2>{{ helloSlider }}</h2>
  <div class="wrapper flex flex-row flex-fill">
    <div class="container" v-for="(pic, index) in pics" :key="`pic-${index}`">
      <ResponsivePicture :folder="folder" :name="pic" :width="width" :height="height" />
      <h2>{{ pic }}</h2>
      <p>Lorem ipsum dolor sit amet</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  max-width: 1080px;
  /* flex: 0 0 auto; */
  overflow-y: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}
.container {
  scroll-snap-align: start;
}
</style>
