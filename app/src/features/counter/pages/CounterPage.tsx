export default function CounterPage() {
  return (
    <>
      <h1>Auto Counter</h1>
      <div>ボタン操作と自動カウント機能で数値を増減できる機能。</div>
      現在のカウント
      <div style={{ fontSize: 100 }}>0</div>
      <button>+1</button>
      <button>-1</button>
      <button>リセット</button>
      <button>自動カウント開始</button>
      <div>ステータス：停止中</div>
    </>
  );
}
