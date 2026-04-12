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
import AddTransaction from "./pages/AddTransaction";
import Wallets from "./pages/Wallets";
import LocationDetail from "./pages/LocationDetail";
import EditWallet from "./pages/EditWallet";
import EditCategory from "./pages/EditCategory";

export default function App() {
  return (
    <BrowserRouter>
      {/* devinisikan route */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* transaksi */}
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/transactions/new" element={<AddTransaction />} />
        <Route path="/transactions/:id" element={<TransactionDetail />} />
        <Route path="/locations/:name" element={<LocationDetail />} />
        {/* kantong */}
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/wallets/new" element={<AddWallet />} />
        <Route path="/wallets/:id" element={<WalletDetail />} />
        <Route path="/wallets/:id/edit" element={<EditWallet />} />
        {/* kategori */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/new" element={<AddCategory />} />
        <Route path="/categories/:id" element={<CategoryDetail />} />
        <Route path="/categories/:id/edit" element={<EditCategory />} />
      </Routes>
    </BrowserRouter>
  );
}
