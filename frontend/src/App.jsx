import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import halaman
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";

export default function App() {
  return (
    <BrowserRouter>
      {/* devinisikan route */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transaksi" element={<Transaction />} />
        <Route path="/kategori" element={<Categories />} />
        <Route path="/kategori/:id" element={<CategoryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
