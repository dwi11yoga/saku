import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import WalletItem from "../components/WalletItem";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";

export default function Categories() {
  // data kantong
  const [wallets, setWallets] = useState([]);
  // data kategoti
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({ wallets: true, categories: true });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/wallets").then((res) => {
      setWallets(res.data);
      setLoading((prev) => ({ ...prev, wallets: false }));
    });
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories").then((res) => {
      setCategories(res.data);
      setLoading((prev) => ({ ...prev, categories: false }));
    });
  }, []);
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
              to={"/"}
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
              to={"/"}
              className="flex flex-col justify-center items-center px-5 py-10 gap-3 rounded-xl text-center border-2 border-dashed  border-custom-green hover:opacity-100 opacity-40"
            >
              <LucideIcons.Plus />
              <div className="">
                <div className="text-xl">Tambah kategori</div>
              </div>
            </Link>
          )}

          {/* daftar kategori */}
          {categories.map((category) => {
            const Icon = LucideIcons[category.icon];
            return (
              <Link
                to={`/kategori/${category.id}`}
                key={category.id}
                className="flex flex-col justify-center px-5 py-10 gap-3 rounded-xl bg-custom-green/10 hover:bg-custom-green/15"
              >
                <Icon />
                <div className="">
                  <div className="text-xl">{category.name}</div>
                  <div className="text-sm">
                    {category.transaction_count} transaksi
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
