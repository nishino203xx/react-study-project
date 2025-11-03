import { useEffect, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

const FILTER_KEY = "react-todo.filter.v1";

function App() {
  const { todos, add, toggle, remove } = useTodos();

  type Filter = "all" | "active" | "done";

  const [filter, setFilter] = useState<Filter>(() => {
    const saved = localStorage.getItem(FILTER_KEY);
    if (saved === "all" || saved === "active" || saved === "done") {
      return saved;
    }
    return "all";
  });

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  useEffect(() => {
    localStorage.setItem(FILTER_KEY, filter);
  }, [filter]);

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 16 }}>
      <h1>ToDo</h1>
      <TodoInput onAdd={add} />
      <TodoList todos={visibleTodos} onToggle={toggle} onRemove={remove} />
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
