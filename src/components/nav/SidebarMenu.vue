<template>
  <aside :class="['flex', 'transition-in-out', { expanded: toggle }]" ref="asideWidth">
    <div class="top-wrapper transition-in-out flex flex-align-center flex-justify-between">
      <div class="flex flex-fill flex-align-center flex-justify-center">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
        <div class="uppercase">Menu</div>
      </div>

      <div
        @click="() => (toggle = !toggle)"
        class="arrow-ctn flex flex-align-center flex-justify-center transition-in-out"
      >
        <svg class="arrow transition-in-out">
          <use xlink:href="@/assets/keyboard_double_arrow_right.svg#arrow" />
        </svg>
      </div>
    </div>

    <ul>
      <li v-for="n in 100" :key="'li' + n">Item {{ n + misc[n % 3] }}</li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

const toggle = ref<boolean>(false)
const misc = [' Lorem ipsum dolor sit amer oulala et encore plus', ' Item ', ' Réalisations ']
const topWrapper = useTemplateRef('asideWidth')

onMounted(() => {
  const sidebarWidth = topWrapper.value?.clientWidth
  if (sidebarWidth) {
    document.documentElement.style.setProperty('--sidebar-custom-width', sidebarWidth + 'px')
  }
})
</script>

<style scoped lang="scss">
$margin: 3rem;

aside {
  color: var(--vt-c-white-soft);
  position: fixed;
  left: calc(var(--sidebar-custom-width) * -1);
  z-index: var(--z-index-top);

  .top-wrapper {
    position: absolute;
    width: calc(var(--sidebar-custom-width) + $margin);
    background-color: var(--vt-c-black-soft);
    border-bottom: 1px solid var(--vt-c-divider-dark-3);
    margin-bottom: -1px;
  }

  .arrow-ctn {
    width: $margin;
    height: $margin;
    cursor: pointer;
    border-color: transparent;
    border-width: 0 0 0 1px;
    border-style: solid;
  }

  .arrow {
    fill: var(--vt-c-white-soft);
    width: 24px;
    height: 24px;
  }

  &.expanded {
    left: 0;
    .arrow-ctn {
      border-color: transparent transparent transparent var(--vt-c-divider-dark-3);
    }
    .arrow {
      transform: rotate(-180deg);
    }
    .top-wrapper {
      width: var(--sidebar-custom-width);
    }
  }

  ul {
    height: calc(100vh - $margin);
    min-height: calc(100vh - $margin);
    max-height: calc(100vh - $margin);
    overflow-y: auto;
    padding: 0 1.5em 1.5em 1.5em;
    margin: $margin 0 0 0;
    background-color: var(--vt-c-black-soft);

    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--vt-c-black-mute);
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: var(--vt-c-divider-dark-3);
    }
  }
}
</style>
