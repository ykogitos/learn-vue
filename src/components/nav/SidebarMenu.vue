<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import type { LinkInterface } from '@/interfaces'

defineProps<{
  links: Array<LinkInterface>
}>()

const toggle = ref<boolean>(false)
const topWrapper = useTemplateRef('asideWidth')

onMounted(() => {
  const sidebarWidth = topWrapper.value?.clientWidth
  const minWidth = 300
  if (sidebarWidth) {
    document.documentElement.style.setProperty(
      '--sidebar-custom-width',
      Math.max(minWidth, sidebarWidth) + 'px'
    )
  }
})
</script>

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
      <li v-for="(link, index) in links" :key="'link-' + index">
        <RouterLink :to="link.path" @click="() => (toggle = !toggle)">{{ link.name }}</RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
$margin: 3rem;

aside {
  color: var(--vt-c-white-soft);
  position: fixed;
  left: calc(var(--sidebar-custom-width) * -1);
  top: 0;
  z-index: var(--z-index-top);

  .top-wrapper {
    position: absolute;
    width: calc(var(--sidebar-custom-width) + $margin);
    background-color: var(--vt-c-black-soft);
    border-bottom: 1px solid var(--vt-c-divider-dark-3);
  }

  .arrow-ctn {
    width: $margin;
    height: $margin;
    cursor: pointer;
    margin-bottom: -1px;
    border-bottom: 1px solid var(--vt-c-green-darken);
    &:hover {
      opacity: 0.6;
    }
  }

  .arrow {
    fill: var(--vt-c-white-soft);
    width: 24px;
    height: 24px;
  }

  a:link,
  a:visited {
    white-space: nowrap;
    display: block;
    padding: 0.875rem 1.5rem;
    color: var(--vt-c-white-soft);
    text-decoration: none;
    transition: 0.4s;

    &.router-link-active {
      background-color: var(--vt-c-white-soft);
      color: var(--vt-c-black-soft);
      // transition: 0.4s;
    }
  }

  &.expanded {
    left: 0;
    .arrow-ctn {
      background-color: var(--vt-c-green);
      border-bottom: 1px solid var(--vt-c-green-darken);
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
    width: var(--sidebar-custom-width);
    overflow-y: auto;
    // padding: 0 1.5em 1.5em 1.5em;
    padding: 0;
    margin: $margin 0 0 0;
    background-color: var(--vt-c-black-soft);

    li {
      list-style: none;
      border-bottom: 1px solid var(--vt-c-divider-dark-3);
    }

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
