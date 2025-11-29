import { useState } from "react"
import styles from "./TodoInput.module.scss"

type Props = {
  onAdd: (title: string) => void
}

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="やることを入力"
        aria-label="新規ToDo"
      />
      <button className={styles.button} type="submit">
        追加
      </button>
    </form>
  )
}
