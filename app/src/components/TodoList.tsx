import type { Todo } from "../types";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function TodoList({ todos, onToggle, onRemove }: Props) {
  return (
    <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
      {todos.length === 0 && (
        <li style={{ color: "#666" }}>まだ何もありません。</li>
      )}
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}
