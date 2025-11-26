import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import SettingsPage from "./pages/SettingsPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <main className="app-root">
      {/* ナビゲーションバー */}
      <NavBar />

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

export default App;
