import type { Todo } from "../types";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onRemove }: Props) {
  return (
    <li
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
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.done ? "line-through" : "none",
        }}
      >
        {todo.title}
      </span>
      <button
        onClick={() => {
          if (confirm(`「${todo.title}」を削除しますか？`)) onRemove(todo.id);
        }}
      >
        削除
      </button>
    </li>
  );
}
