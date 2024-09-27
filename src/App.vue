<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavView from '@/components/nav/NavView.vue'
import SidebarMenu from '@/components/nav/SidebarMenu.vue'
</script>

<template>
  <SidebarMenu />
  <header>
    <div style="border: 1px solid black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
        :style="{ fill: 'var(--vt-c-text-dark-3)' }"
      >
        <path
          d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"
        />
      </svg>
    </div>

    <img src="@/assets/keyboard_double_arrow_right.svg" alt="" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <NavView />
    </div>
    <svg class="shape-twitter-3">
      <use xlink:href="@/assets/keyboard_double_arrow_right.svg#arrow" />
    </svg>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
.shape-twitter-3 {
  fill: purple;
  width: 24px;
  height: 24px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
