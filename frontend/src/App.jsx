import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import halaman
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import WalletDetail from "./pages/WalletDetails";
import AddCategory from "./pages/AddCategory";
import TransactionDetail from "./pages/TransactionDetail";
import AddWallet from "./pages/AddWallet";

export default function App() {
  return (
    <BrowserRouter>
      {/* devinisikan route */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* transaksi */}
        <Route path="/transaksi" element={<Transaction />} />
        <Route path="/transaksi/tambah" />
        <Route path="/transaksi/:id" element={<TransactionDetail />} />
        {/* kantong & kategori */}
        <Route path="/kategori" element={<Categories />} />
        <Route path="/kategori/tambah" element={<AddCategory />} />
        <Route path="/kategori/:id" element={<CategoryDetail />} />
        <Route path="/kantong/tambah" element={<AddWallet />} />
        <Route path="/kantong/:id" element={<WalletDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
