import { type ReactNode } from "react";
import "./App.css";
import { NavLink, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
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
