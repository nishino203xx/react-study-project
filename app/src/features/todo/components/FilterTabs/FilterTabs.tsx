export type Filter = "all" | "active" | "done"

type Props = {
  filter: Filter
  onChange: (next: Filter) => void
}

export default function FilterTabs({ filter, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      {(["all", "active", "done"] as const).map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onChange(f)}
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
  )
}
