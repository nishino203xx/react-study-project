import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TodoPage from "./features/todo/pages/TodoPage";
import CounterPage from "./features/counter/pages/CounterPage";
import SettingsPage from "./pages/SettingsPage";
import NavBar from "./components/layout/NavBar";

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
          <Route path="/counter" element={<CounterPage />}></Route>
          <Route path="/settings" element={<SettingsPage />}></Route>
        </Routes>
      </section>
    </main>
  );
}

export default App;
