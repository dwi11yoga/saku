import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import WalletItem from "../components/WalletItem";
import DashboardLayout from "../layouts/DashboardLayout";
import Skeleton from "../components/Skeleton";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function Wallets() {
  // data kantong
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState({ wallets: true, categories: true });
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get("/wallets", { params: { user_id: 1 } })
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
    <DashboardLayout title={"Kantong"}>
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
            to={"/wallets/new"}
            className="flex flex-col justify-center items-center px-5 aspect-square gap-3 rounded-xl text-center border-2 border-dashed border-custom-green hover:opacity-100 opacity-40"
          >
            <Plus />
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
    </DashboardLayout>
  );
}
