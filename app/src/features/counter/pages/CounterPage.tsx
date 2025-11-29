import { useEffect, useState } from "react"

const Counter = () => {
  const [count, setCount] = useState(0)
  const [autoCount, setAutoCount] = useState(false)
  const increment = () => setCount((count) => count + 1)
  const decrement = () => setCount((count) => count - 1)
  const reset = () => setCount(0)
  useEffect(() => {
    if (!autoCount) return
    const timer = setInterval(() => setCount((count) => count + 1), 1000)
    return () => clearInterval(timer)
  }, [autoCount])
  return (
    <>
      現在のカウント
      <div>{count}</div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>リセット</button>
      <AutoCounter
        autoCount={autoCount}
        toggle={() => setAutoCount((autoCount) => !autoCount)}
      />
    </>
  )
}

const AutoCounter = ({
  autoCount,
  toggle,
}: {
  autoCount: boolean
  toggle: () => void
}) => {
  return (
    <button onClick={toggle}>自動カウント{autoCount ? "停止" : "開始"}</button>
  )
}

export default function CounterPage() {
  return (
    <>
      <h1>Auto Counter</h1>
      <div>ボタン操作と自動カウント機能で数値を増減できる機能。</div>
      <Counter />
    </>
  )
}
