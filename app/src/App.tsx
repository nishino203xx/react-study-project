import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList";
import FilterTabs, { type Filter } from "./components/FilterTabs";
import "./App.css";
import { NavLink, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import SettingsPage from "./pages/SettingsPage";

const FILTER_KEY = "react-todo.filter.v1";
type SortOrder = "newest" | "oldest";

function App() {
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
    <main className="app-root">
      {/* ナビゲーションバー */}
      <header>
        <NavBar />
      </header>

      {/* ページ切り替え */}
      <section>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/todos" element={<TodoPage />}></Route>
          <Route path="/settings" element={<SettingsPage />}></Route>
        </Routes>
      </section>

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
    </main>
  );
}

function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>My React App</div>

      <div style={{ display: "flex", gap: 8 }}>
        <NavItem to={"/"}>ホーム</NavItem>
        <NavItem to={"/todos"}>ToDo</NavItem>
        <NavItem to={"/settings"}>設定</NavItem>
      </div>
    </nav>
  );
}

type NavItemProps = {
  to: string;
  children: ReactNode;
};

function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: "4px 10px",
        borderRadius: 9999,
        textDecoration: "none",
        fontSize: 14,
        border: isActive ? "1px solid #0ea5e9" : "1px solid transparent",
        color: isActive ? "#0ea5e9" : "#64748b",
        backgroundColor: isActive ? "rgba(14,165,233,0.08)" : "transparent",
      })}
    >
      {children}
    </NavLink>
  );
}

export default App;
