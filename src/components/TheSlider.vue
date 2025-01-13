<script lang="ts" setup>
import { ref } from 'vue'
import ResponsivePicture from './images/ResponsivePicture.vue'

const helloSlider = ref('Slider ' + window.devicePixelRatio)

const pics = [
  {
    picture: 'PIC_01',
    name: 'Colosses de Memnon',
    location: 'https://maps.app.goo.gl/wxpkGfFdtnSLKW9J8'
  },
  {
    picture: 'PIC_02',
    name: 'Karnak',
    location: ''
  },
  {
    picture: 'PIC_03',
    name: 'Le Ramesséum',
    location: 'https://maps.app.goo.gl/9iVJcGTegycJkZfF9'
  },
  {
    picture: 'PIC_04',
    name: 'Assouan',
    location: 'https://maps.app.goo.gl/KQKY1dTsp2BsP9Mk7'
  },
  {
    picture: 'PIC_05',
    name: 'Temple de Karnak',
    location: 'https://maps.app.goo.gl/c4PtJ9CB5Q5c2sMZ7'
  },
  {
    picture: 'PIC_06',
    name: 'Temple de Karnak'
  },
  {
    picture: 'PIC_07',
    name: 'Temple de Karnak'
  },
  {
    picture: 'PIC_08',
    name: 'Temple de Karnak'
  },
  {
    picture: 'PIC_09',
    name: 'Pyramides de Gizeh',
    location: 'https://maps.app.goo.gl/cgeYv7WTt3ubSiBj9'
  },
  {
    picture: 'PIC_10',
    name: 'Temple de Karnak'
  },
  {
    picture: 'PIC_11',
    name: 'Île Éléphantine'
  }
]

const widthRef = 250
const width = ref(widthRef)
const height = ref(Math.floor((widthRef * 3) / 4))
const folder = ref('/images/slider')
</script>

<template>
  <h2>{{ helloSlider }}</h2>
  <div class="wrapper flex flex-row flex-fill">
    <div class="container" v-for="(pic, index) in pics" :key="`pic-${index}`">
      <ResponsivePicture :folder="folder" :name="pic.picture" :width="width" :height="height" />
      <h2>{{ pic.name }}</h2>
      <p>{{ pic.picture }}</p>
    </div>
  </div>
  <slot></slot>
</template>

<style lang="scss" scoped>
.wrapper {
  max-width: 1080px;
  /* flex: 0 0 auto; */
  overflow-y: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  margin-left: -0.5rem;
  padding-bottom: 1rem;
}
.container {
  padding: 0.5rem;
  margin-left: 0.5rem;
  scroll-snap-align: center;
  border: 0.01rem solid var(--vt-c-divider-dark-3);
  border-radius: 0.3rem;
}
</style>
