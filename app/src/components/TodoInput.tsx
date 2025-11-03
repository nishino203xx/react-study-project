import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
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
  );
}
