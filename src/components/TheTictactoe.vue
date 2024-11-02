<script setup lang="ts">
  import { ref } from 'vue'
  import TheTictactoeSquare from './TheTictactoeSquare.vue'
  import {
    getWinningSquareIndex,
    setTictactoeCssWidth,
    highLightSquare,
    computeWinningMove
  } from '@/helpers/tictactoe'
  import IconClose from './icons/IconClose.vue'
  import IconCircle from './icons/IconCircle.vue'

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
    },
    {
      label: '7 x 7',
      value: 49
    }
  ])

  const squareItems = ref<string[]>([...Array(selectedTypeGame.value).fill('')])
  const winningSquaresIndexes = ref<number[][]>(getWinningSquareIndex(selectedTypeGame.value))
  const player = ref('X')
  const winningSquaresRow = ref(-1)
  const winner = ref(false)
  const playable = ref(true)
  const countFreeSquare = ref(selectedTypeGame.value)
  player.value = Math.random() > .5 ? 'O' : 'X'

  // set correct value CSS
  setTictactoeCssWidth(squareItems.value.length)

  const handleNewGameSize = (value: number) => {
    selectedTypeGame.value = value
    winningSquaresRow.value = -1
    squareItems.value = [...Array(value).fill('')]
    winningSquaresIndexes.value = getWinningSquareIndex(value)
    player.value = 'X'
    winner.value = false
    playable.value = true
    countFreeSquare.value = value
    player.value = Math.random() > .5 ? 'O' : 'X'
    setTictactoeCssWidth(value)
    // if (player.value === 'O') handleSquareItem(4)
  }

  const handleSquareItem = (index: number) => {
    if (squareItems.value[index] === '' && !winner.value && playable.value) {
      squareItems.value[index] = player.value
      const winnerStatus = computeWinningMove(
        player.value,
        squareItems.value,
        winningSquaresIndexes.value
      )

      winner.value = winnerStatus.win
      playable.value = winnerStatus.playable
      setWinningSquaresRow(winnerStatus.row)
      if (!winnerStatus.win) setPlayer()
    }

    countFreeSquare.value = squareItems.value.reduce((acc, x) => {
      if (x === '') {
        return acc + 1
      } else {
        return acc
      }
    }, 0)
  }

  const setWinningSquaresRow = (value: number) => {
    winningSquaresRow.value = value
  }

  const setPlayer = () => {
    player.value = player.value === 'X' ? 'O' : 'X'
  }

  // onMounted(()=>{
  //   if (player.value === 'O') handleSquareItem(4)
  // })
</script>

<template>
  <h1>Tic Tac Toe</h1>

  <div class="wrapper-game flex flex-align-center flex-justify-center">
    <div class="wrapper-game-ctn flex flex-column flex-align-center flex-justify-center">
      <div class="v-margin-bottom--small">
        Select the game :
        <div class="flex flex-row">
          <div v-for="gameType in gameTypes" :key="gameType.label" class="radio-game">
            <label :for="gameType.label" :class="{ selected: selectedTypeGame === gameType.value }">{{ gameType.label }}
            </label>
            <input type="radio" name="game-type" :id="gameType.label" :value="gameType.value"
              @click="handleNewGameSize(gameType.value)" v-model="selectedTypeGame" />
          </div>
        </div>
      </div>

      <div class="game-ctn" :class="{ 'no-pointer': !playable }">
        <template v-for="(squareItem, index) in squareItems" :key="index">
          <TheTictactoeSquare :content="squareItem" :class="{
            X: squareItem === 'X',
            O: squareItem === 'O',
            win: highLightSquare(winningSquaresIndexes, winningSquaresRow, index) && winner
          }" @click="handleSquareItem(index)" />
        </template>
      </div>

      <div :class="['board', 'v-margin-bottom--medium']">
        The Board - Free squares: {{ countFreeSquare }} / {{ selectedTypeGame }}<br />

        <p class="no-winner" v-if="(countFreeSquare === 0 && !winner) || !playable">🤔No winner</p>
        <template v-else>
          <p v-if="!winner" class="player flex flex-justify-center flex-align-center">
            Player :
            <template v-if="player === 'X'">
              <IconClose />
            </template>
            <template v-else>
              <IconCircle />
            </template>
          </p>
          <p v-else class="flex flex-align-center flex-justify-center winner-ctn">
            Winner is
            <template v-if="player === 'X'">
              <IconClose />
            </template>
            <template v-else>
              <IconCircle />
            </template>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    text-align: center;
    border-bottom: solid black 0.1rem;
    margin-top: -0.1rem;
  }

  .radio-game {
    margin-right: 0.5rem;
    padding-right: 0.8rem;
    border-right: 1px solid var(--vt-c-divider-dark-3);
    color: var(--vt-c-divider-dark-1);

    &:last-child {
      border-right: none;
      margin-right: 0;
      padding-right: 0;
    }
  }

  label {
    cursor: pointer;
    font-weight: bold;
    padding-left: 0.4rem;

    &:before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      width: 1rem;
      height: 1rem;
      background-color: var(--vt-c-text-dark-2);
      border-radius: 0.2rem;
    }

    &.selected {
      color: var(--vt-c-green);

      &:before {
        content: '';
        color: var(--vt-c-white);
        background-color: var(--vt-c-green);
      }
    }
  }

  input[type='radio'] {
    position: absolute;
    left: -200vw;
  }

  span.winner {
    color: var(--vt-c-green);
    font-weight: bold;
    padding: 0.2rem;
    font-size: 1.3rem;
  }

  .game-ctn {
    width: 100%;
    max-width: 250px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: var(--vt-c-divider-dark-2);
  }

  .player {
    & svg {
      width: 1.8rem;
      fill: var(--vt-c-green);
    }
  }

  .winner-ctn {
    & svg {
      margin-left: 0.2rem;
      background-color: var(--vt-c-green);
      width: 1.5rem;
      fill: var(--vt-c-white);
      border-radius: 3px;
    }
  }
</style>
