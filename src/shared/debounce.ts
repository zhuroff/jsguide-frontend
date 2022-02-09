const debounce = (fn: (query: string) => void, delay: number) => {
  let timerID: ReturnType<typeof setTimeout>

  return (query: string) => {
    clearTimeout(timerID)
    timerID = setTimeout(() => fn(query), delay)
  }
}

export default debounce
