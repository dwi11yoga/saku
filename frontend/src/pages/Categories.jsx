import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import ErrorPage from "./ErrorPage";

export default function Categories() {
  // data kategoti
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({ wallets: true, categories: true });
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get("/categories", { params: { user_id: 1 } })
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
      {/* loading */}
      {loading.categories && (
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} height={"h-40"} width={"w-full"} />
          ))}
        </div>
      )}
      {/* isi */}
      <div className="grid grid-cols-6 gap-2">
        {/* Tambah kategori */}
        {!loading.categories && (
          <Link
            to={"/categories/new"}
            className="flex flex-col justify-center items-center px-5 py-10 gap-3 rounded-xl text-center border-2 border-dashed  border-custom-green hover:opacity-100 opacity-40"
          >
            <Plus />
            <div className="">
              <div className="text-xl">Tambah kategori</div>
            </div>
          </Link>
        )}

        {/* daftar kategori */}
        {categories.map((category) => (
          <Link
            to={`/categories/${category.id}`}
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
    </DashboardLayout>
  );
}
