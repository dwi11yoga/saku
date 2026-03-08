import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import halaman
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      {/* devinisikan route */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}