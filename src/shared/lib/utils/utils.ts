export const delay = (ms: number, signal?: AbortSignal) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, ms)

    if (signal?.aborted) {
      reject(new Error('Delay aborted'))
      clearTimeout(timeout)
    }
  })
}
