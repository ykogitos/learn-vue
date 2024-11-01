<script setup lang="ts">
  import IconClose from './icons/IconClose.vue';
  import IconCircle from './icons/IconCircle.vue';
  defineProps<{
    content: string
  }>()
</script>

<template>
  <button class="flex flex-align-center flex-justify-center" :class="['square']">
    <template v-if="content === 'X'">
      <IconClose />
    </template>
    <template v-else-if="content === 'O'">
      <IconCircle />
    </template>
    <template v-else>{{ content }}</template>
  </button>
</template>

<style lang="scss" scoped>
  .square {
    border: none;
    border-radius: 0.2rem;
    margin: 0.1rem 0.1rem 0.1rem;
    width: calc(100% / var(--tic-tac-toe-size) - 2 * 0.1rem);
    aspect-ratio: 1 / 1;
    font-size: 1.7rem;

    &.X {
      color: var(--vt-c-green);
    }

    &.O {
      color: var(--vt-c-indigo);
    }

    &:active {
      background-color: var(--vt-c-green-tap);
    }
  }


  .no-pointer .square {
    cursor: not-allowed;
  }

  .X svg {
    width: 70%;
  }

  .O svg {
    width: 60%;
  }

  .win {
    background-color: var(--vt-c-green);
    animation: squareAnimation .25s linear 5;

    &.X,
    &.O {
      color: var(--vt-c-white);
    }

    &.X svg,
    &.O svg {
      fill: white;
    }
  }

  @keyframes squareAnimation {
    0% {
      transform: rotate(0deg) scale(1)
    }

    25% {
      transform: rotate(10deg) scale(.8)
    }

    50% {
      transform: rotate(0eg) scale(1)
    }

    75% {
      transform: rotate(-20deg) scale(.9)
    }

    to {
      transform: rotate(0deg) scale(1)
    }
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(0, -1px, 0)
    }

    20%,
    80% {
      transform: translate3d(0, 2px, 0)
    }

    30%,
    50%,
    70% {
      transform: translate3d(0, -4px, 0)
    }

    40%,
    60% {
      transform: translate3d(0, 4px, 0)
    }
  }
</style>
