export const getWinningSquareIndex = (l: number): Array<Array<number>> => {
  const size = Math.sqrt(l)
  const rows = new Array(size).fill(0).map(() => new Array(size).fill(0))
  // rows
  for (let i = 0; i < l; i++) {
    const row = Math.floor(i / size)
    const column = i % size
    rows[row][column] = i
  }
  // columns
  for (let i = 0; i < size; i++) {
    const row = new Array(size).fill(0)
    for (let j = 0; j < size; j++) {
      row[j] = i + j * size
    }
    rows.push(row)
  }
  //diagonal /
  let row = new Array(size).fill(0)
  for (let j = 0; j < size; j++) {
    row[j] = j + j * size
  }
  rows.push(row)
  //diagonal \
  row = new Array(size).fill(0)
  for (let j = size; j > 0; j--) {
    row[j - 1] = (size - 1) * j
  }
  rows.push(row)
  return rows
}

export const setTictactoeCssWidth = (value: number): void => {
  document.documentElement.style.setProperty('--tic-tac-toe-size', Math.sqrt(value) + '')
}

export const getBinaryArray = (player: string, squareItems: string[]): number[] => {
  return squareItems.map((squareItem) => (squareItem === player ? 1 : squareItem === '' ? 0 : -10))
}

export const createRows = (gameStatus: number[], winningSquaresIndexes: number[][]): number[][] => {
  const rows = []
  for (let i = 0, l = winningSquaresIndexes.length; i < l; i++) {
    const row = []
    for (let j = 0, ll = winningSquaresIndexes[i].length; j < ll; j++) {
      row.push(gameStatus[winningSquaresIndexes[i][j]])
    }
    rows.push(row)
  }

  return rows
}

const computePlayable = (rows:number[][]) => {
  for (let i = 0, l = rows.length; i < l; i++) {
    if (rows[i].reduce((acc, x) => acc + x, 0) >= 0) {
      return true
    }
  }

  return false
}

export const computeWinner = (size: number, rows: number[][]): { win: boolean; row: number, playable: boolean } => {
  const out = {
    win: false, 
    row: -1,
    playable: false
  }
  // check is there is a winner
  for (let i = 0, l = rows.length; i < l; i++) {
    if (rows[i].reduce((acc, x) => acc + x, 0) === size) {
      out.win = true;
      out.row = i;
      out.playable = false;
      break;
    }
  }

  //next player
  const nextPlayer = rows.map((array) => {
    return array.map((value) => {
      return value === -10 ? 1 : value === 1 ? -10 : 0
    })
  })

  out.playable = computePlayable(rows) || computePlayable(nextPlayer)
  return out
}

export const computeWinningMove = (
  player: string,
  squareItems: string[],
  winningSquaresIndexes: number[][]
): { win: boolean; row: number; playable: boolean } => {
  const gameStatus = getBinaryArray(player, squareItems)
  if (winningSquaresIndexes && winningSquaresIndexes.length) {
    const winnerStatus = computeWinner(
      Math.sqrt(squareItems.length),
      createRows(gameStatus, winningSquaresIndexes)
    )
    return winnerStatus
  }
  return {
    win: false,
    row: -1,
    playable: true
  }
}

export const highLightSquare = function (
  winningSquaresIndexes: number[][],
  winningSquaresRow: number,
  index: number
): boolean {
  if (winningSquaresIndexes && winningSquaresRow >= 0) {
    return winningSquaresIndexes[winningSquaresRow].includes(index)
  }
  return false
}
