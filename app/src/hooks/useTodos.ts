import { useEffect, useState } from "react";
import type { Todo } from "../types";

const STORAGE_KEY = "react-todo.todos.v1";

export function useTodos() {
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error("データの保存に失敗しました。", e);
    }
  }, [todos]);

  const add = (title: string) => {
    const t = title.trim();
    if (!t) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: t,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const toggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const remove = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return { todos, add, toggle, remove };
}
