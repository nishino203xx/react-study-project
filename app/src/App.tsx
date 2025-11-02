import { useState } from "react";
import "./App.css";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = text.trim();
    if (!title) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);

    setText("");
  };

  const toggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const remove = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 16 }}>
      <h1>ToDo</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 8, marginTop: 16 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="やることを入力"
          aria-label="新規ToDo"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">追加</button>
      </form>

      {/* 入力プレビュー（後で削除） */}
      <p style={{ marginTop: 8, color: "#666" }}>
        入力中: <strong>{text || "（未入力）"}</strong>
      </p>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
        {todos.length === 0 && (
          <li style={{ color: "#666" }}>まだ何もありません。</li>
        )}
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: t.done ? "line-through" : "none",
              }}
            >
              {t.title}
            </span>
            <button
              onClick={() => {
                if (confirm(`「${t.title}」を削除しますか？`)) remove(t.id);
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
