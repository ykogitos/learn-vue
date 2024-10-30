<script setup lang="ts">
import IconClose from './icons/IconClose.vue';
import IconCircle from './icons/IconCircle.vue';
defineProps<{
  content: string
}>()
</script>

<template>
    <button class="flex flex-align-center flex-justify-center" :class="['square']">
      <template v-if="content === 'X'" >
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


.no-pointer .square{
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
  animation-name: squareAnimation;
  animation-duration:0.4s;
  animation-timing-function: ease-in-out;
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
  0%   {transform: rotate(0deg) scale(1);}
  25%  {transform: rotate(40deg) scale(0.71);}
  75%  {transform: rotate(-55deg) scale(1.2);}
  100% {transform: rotate(0deg) scale(1);}
}
</style>
