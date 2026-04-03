import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import WalletItem from "../components/WalletItem";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import ErrorPage from "./ErrorPage";

export default function Categories() {
  // data kantong
  const [wallets, setWallets] = useState([]);
  // data kategoti
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({ wallets: true, categories: true });
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/wallets")
      .then((res) => {
        setWallets(res.data);
        setLoading((prev) => ({ ...prev, wallets: false }));
      })
      .catch((err) => {
        setNotFound({
          status: err.response?.status,
          message: err.response?.message,
        });
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, categories: false }));
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        setNotFound({
          status: err.response?.status,
          message: err.response?.data.message,
        });
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, categories: false }));
      });
  }, []);

  // jika data tidak ditemukan
  if (notFound) {
    return (
      <ErrorPage
        title={"Kantong & kategori"}
        status={notFound.status}
        message={notFound.message}
      />
    );
  }

  return (
    <DashboardLayout title={"Kantong & kategori"}>
      {/* kantong / wallet */}
      <div className="space-y-3">
        <h1>Kantong</h1>
        {/* loading */}
        {loading.wallets && (
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map(() => (
              <Skeleton height={"aspect-square"} width={"w-full"} />
            ))}
          </div>
        )}
        {/* isi data */}
        <div className="grid grid-cols-6 gap-2">
          {/* Tambah kantong */}
          {!loading.wallets && (
            <Link
              to={"/kantong/tambah"}
              className="flex flex-col justify-center items-center px-5 aspect-square gap-3 rounded-xl text-center border-2 border-dashed border-custom-green hover:opacity-100 opacity-40"
            >
              <LucideIcons.Plus />
              <div className="">
                <div className="text-xl">Tambah kantong</div>
              </div>
            </Link>
          )}

          {/* daftar kantong */}
          {wallets.map((wallet) => (
            <WalletItem key={wallet.id} wallet={wallet} />
          ))}
        </div>
      </div>

      {/* kategori */}
      <div className="space-y-3">
        <h1>Kategori</h1>
        {/* loading */}
        {loading.categories && (
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 12 }).map(() => (
              <Skeleton height={"h-40"} width={"w-full"} />
            ))}
          </div>
        )}
        {/* isi */}
        <div className="grid grid-cols-6 gap-2">
          {/* Tambah kategori */}
          {!loading.categories && (
            <Link
              to={"/kategori/tambah"}
              className="flex flex-col justify-center items-center px-5 py-10 gap-3 rounded-xl text-center border-2 border-dashed  border-custom-green hover:opacity-100 opacity-40"
            >
              <LucideIcons.Plus />
              <div className="">
                <div className="text-xl">Tambah kategori</div>
              </div>
            </Link>
          )}

          {/* daftar kategori */}
          {categories.map((category) => (
            <Link
              to={`/kategori/${category.id}`}
              key={category.id}
              className="flex flex-col justify-center transition-all px-5 hover:px-7 py-10 gap-3 rounded-xl bg-custom-green/10 hover:bg-custom-green/15"
            >
              <div className="text-3xl">{category.icon}</div>
              <div className="">
                <div className="text-xl">{category.name}</div>
                <div className="text-sm">
                  {category.transaction_count} transaksi
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
