import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 16 }}>
      <h1>ToDo</h1>

      <form style={{ display: "flex", gap: 8, marginTop: 16 }}>
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
    </main>
  );
}

export default App;
