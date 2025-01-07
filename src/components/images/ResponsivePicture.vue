<script setup lang="ts">
const props = defineProps<{
  folder: string
  name: string
  width?: number
  height?: number
}>()
</script>

<template>
  <img
    :src="`${props.folder}/${props.name}_DPI_1.jpg`"
    :srcset="`${props.folder}/${props.name}_DPI_2.jpg 2x, ${props.folder}/${props.name}_DPI_3.jpg 3x`"
    alt=""
    :width="props?.width ?? 250"
    :height="props?.height ?? 188"
  />
</template>
