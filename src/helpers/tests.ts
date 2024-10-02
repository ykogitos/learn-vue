export const sleep = (ms: number = 350) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
