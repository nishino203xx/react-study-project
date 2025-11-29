import { useState } from "react"

const Counter = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount((count) => count + 1)
  const decrement = () => setCount((count) => count - 1)
  const reset = () => setCount(0)
  return (
    <>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>リセット</button>
      <button>自動カウント開始</button>
      <div>ステータス：停止中</div>
    </>
  )
}

export default function CounterPage() {
  return (
    <>
      <h1>Auto Counter</h1>
      <div>ボタン操作と自動カウント機能で数値を増減できる機能。</div>
      現在のカウント
      <Counter />
    </>
  )
}
