import { useEffect, useMemo, useState } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import FilterTabs, { type Filter } from "../components/FilterTabs";

const FILTER_KEY = "react-todo.filter.v1";
type SortOrder = "newest" | "oldest";

export default function TodoPage() {
  const { todos, add, toggle, remove } = useTodos();

  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const [filter, setFilter] = useState<Filter>(() => {
    const saved = localStorage.getItem(FILTER_KEY);
    if (saved === "all" || saved === "active" || saved === "done") {
      return saved;
    }
    return "all";
  });

  const visibleTodos = useMemo(() => {
    const filtered = todos.filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "done") return t.done;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });

    return sorted;
  }, [todos, filter, sortOrder]);

  useEffect(() => {
    localStorage.setItem(FILTER_KEY, filter);
  }, [filter]);

  return (
    <>
      <h1>ToDo</h1>
      <TodoInput onAdd={add} />
      <label>
        並び順
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="newest">新しい順</option>
          <option value="oldest">古い順</option>
        </select>
      </label>
      <FilterTabs filter={filter} onChange={setFilter} />
      <TodoList todos={visibleTodos} onToggle={toggle} onRemove={remove} />
    </>
  );
}
