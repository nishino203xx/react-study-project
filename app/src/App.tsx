import { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const STORAGE_KEY = "react-todo.todos.v1";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("データの復元に失敗しました。", err);
      return [];
    }
  });

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

  type Filter = "all" | "active" | "done";

  const [filter, setFilter] = useState<Filter>("all");

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error("データの保存に失敗しました。", e);
    }
  }, [todos]);

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

      <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
        {todos.length === 0 && (
          <li style={{ color: "#666" }}>まだ何もありません。</li>
        )}
        {visibleTodos.map((t) => (
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
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {(["all", "active", "done"] as const).map((f) => (
          <button
            type="button"
            onClick={() => setFilter(f)}
            style={{
              padding: "4px 10px",
              border: "1px solid #ddd",
              borderRadius: 6,
              fontWeight: filter === f ? "bold" : "normal",
              textDecoration: filter === f ? "underline" : "none",
            }}
          >
            {f === "all" ? "All" : f === "active" ? "Active" : "Done"}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
