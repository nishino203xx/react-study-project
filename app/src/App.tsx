import { useEffect, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterTabs, { type Filter } from "./components/FilterTabs";
import "./App.css";

const FILTER_KEY = "react-todo.filter.v1";

function App() {
  const { todos, add, toggle, remove } = useTodos();

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
      <FilterTabs filter={filter} onChange={setFilter} />
      <TodoList todos={visibleTodos} onToggle={toggle} onRemove={remove} />
    </main>
  );
}

export default App;
