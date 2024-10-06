<script setup lang="ts">
import { ref, computed } from 'vue'
import TheTictactoeSquare from './TheTictactoeSquare.vue'
import {
  getWinningSquareIndex,
  setTictactoeCssWidth,
  getBinaryArray,
  computeWinner,
  highLightSquare,
  createRows
} from '@/helpers/tictactoe'

const selectedTypeGame = ref(9)
const gameTypes = ref([
  {
    label: '3 x 3',
    value: 9
  },
  {
    label: '4 x 4',
    value: 16
  },
  {
    label: '5 x 5',
    value: 25
  }
])

const squareItems = ref<string[]>([...Array(selectedTypeGame.value).fill('')])
const winningSquaresIndexes = ref<number[][]>(getWinningSquareIndex(selectedTypeGame.value))
const player = ref('X')
const winningSquaresRow = ref(-1)

// set correct value CSS
setTictactoeCssWidth(squareItems.value.length)

const handleNewGameSize = (value: number) => {
  selectedTypeGame.value = value
  winningSquaresRow.value = -1
  squareItems.value = [...Array(value).fill('')]
  winningSquaresIndexes.value = getWinningSquareIndex(value)
  setTictactoeCssWidth(value)
}

const handleSquareItem = (index: number) => {
  if (squareItems.value[index] === '' && !winner.value) {
    squareItems.value[index] = player.value
    player.value = player.value === 'X' ? 'O' : 'X'
  }
}

const setWinningSquaresRow = (value: number) => {
  winningSquaresRow.value = value
}

const winner = computed((): boolean => {
  let gameStatus = getBinaryArray(player.value, squareItems.value)

  if (winningSquaresIndexes.value && winningSquaresIndexes.value.length) {
    // const rows = []
    // for (let i = 0, l = winningSquaresIndexes.value.length; i < l; i++) {
    //   const row = []
    //   for (let j = 0, ll = winningSquaresIndexes.value[i].length; j < ll; j++) {
    //     row.push(gameStatus[winningSquaresIndexes.value[i][j]])
    //   }
    //   rows.push(row)
    // }

    const winnerStatus = computeWinner(
      Math.sqrt(squareItems.value.length),
      createRows(gameStatus, winningSquaresIndexes.value)
    )

    setWinningSquaresRow(winnerStatus.row)
    return winnerStatus.win
  }
  return false
})
</script>

<template>
  <h1>Tic Tac Toe</h1>

  <div class="wrapper-game flex flex-align-center flex-justify-center">
    <div class="flex flex-column flex-align-center flex-justify-center">
      <div class="v-margin-bottom--small">
        Select the game :
        <div class="flex flex-row">
          <div v-for="gameType in gameTypes" :key="gameType.label" class="radio-game">
            <input
              type="radio"
              name="game-type"
              :id="gameType.label"
              :value="gameType.value"
              @click="handleNewGameSize(gameType.value)"
              v-model="selectedTypeGame"
            />
            <label :for="gameType.label" :class="{ selected: selectedTypeGame === gameType.value }"
              >{{ gameType.label }}
            </label>
          </div>
        </div>
      </div>
      <div class="game-ctn">
        <template v-for="(squareItem, index) in squareItems" :key="index">
          <TheTictactoeSquare
            :content="squareItem"
            :class="{
              win: highLightSquare(winningSquaresIndexes, winningSquaresRow, index) && winner
            }"
            @click="handleSquareItem(index)"
          />
        </template>
      </div>
    </div>

    <div :class="['board']">
      The Board
      <p v-if="!winner">Player : {{ player }}</p>
      <p v-else>Winner is {{ player === 'X' ? 'O' : 'X' }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.radio-game {
  margin-right: 0.5rem;
  padding-right: 0.5rem;
  border-right: 1px solid var(--vt-c-black-mute);
  &:last-child {
    border-right: none;
    margin-right: 0;
    padding-right: 0;
  }
}

label {
  font-weight: bold;
  padding-left: 0.4rem;
  &.selected {
    color: var(--vt-c-green);
  }
}

.game-ctn {
  width: var(--tic-tac-toe-width);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
