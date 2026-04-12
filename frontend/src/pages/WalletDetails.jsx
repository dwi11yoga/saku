import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { dateFormat, moneyFormat, transactionDirection } from "../utils/format";
import Skeleton from "../components/Skeleton";
import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  CircleEllipsis,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import axios from "axios";
import TransactionItem from "../components/TransactionItem";
import walletColor from "../utils/walletColor";
import DetailHeader from "../components/DetailHeader";

export default function WalletDetail() {
  //   dapatkan id kategori
  const { id } = useParams();

  //   dapatkan data kategori
  const [wallet, setWallet] = useState({ transaction: [] });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/wallet/${id}`)
      .then((res) => {
        setWallet(res.data);
      })
      .catch((err) => {
        setNotFound({
          status: err.response?.status,
          message: err.response?.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // periode
  var periode;
  if (wallet.transaction.length == 0) {
    periode = dateFormat(wallet.created_at);
  } else if (
    dateFormat(wallet.firstTransaction, "short-date") ==
    dateFormat(wallet.latestTransaction, "short-date")
  ) {
    periode = dateFormat(wallet.firstTransaction);
  } else {
    periode = `${dateFormat(wallet.firstTransaction, "short-date")} - ${dateFormat(wallet.latestTransaction, "short-date")}`;
  }

  // jika data tidak ditemukan
  if (notFound)
    return (
      <ErrorPage
        title={"Detail kategori"}
        status={notFound.status}
        message={notFound.message}
      />
    );

  return (
    <DashboardLayout title={`Detail kantong`}>
      <DetailHeader>
        {/* judul */}
        <div className={`flex items-center justify-center gap-1`}>
          {wallet.icon} {wallet.name}
        </div>
        {/* saldo */}
        <div className="text-5xl">
          IDR{" "}
          <span
            className={`font-semibold ${wallet.balance > 1 ? "text-custom-green" : "text-red-500"}`}
          >
            {moneyFormat(wallet.balance ?? 0)}
          </span>
        </div>
        {/* transaksi */}
        <div className="flex justify-center gap-2 text-neutral-600">
          <div className="flex items-center gap-1" title="Total transaksi">
            <ArrowLeftRight size={18} />
            {wallet.transaction_count} transaksi
          </div>
          |
          <div className="flex items-center" title="Transaksi masuk">
            <ArrowDownLeft size={18} /> {wallet.debit_count} masuk
          </div>
          |
          <div className="flex items-center" title="Transaksi keluar">
            <ArrowUpRight size={18} /> {wallet.credit_count} keluar
          </div>
        </div>

        {/* tambah transaksi */}
        <div className="flex justify-center mt-8 gap-2">
          <Link
            to={"/transactions/new"}
            title="Tambah transaksi baru"
            className={`w-fit flex items-center justify-center gap-2 rounded-xl p-3 hover:px-5 text-sm border-2 border-dashed hover:bg-custom-green/20 text-neutral-500 border-neutral-500 hover:text-neutral-800 hover:border-neutral-800 cursor-pointer hover:rounded-[3rem] focus:rounded-[3rem] transition-all ease-in-out`}
          >
            <Plus size={20} />
            <div className="">Tambah transaksi</div>
          </Link>
          <Link
            to={`/wallets/${wallet.id}/edit`}
            title="Edit kantong"
            className={`group w-fit flex items-center justify-center gap-2 rounded-xl p-3 hover:px-5 text-sm border-2 border-dashed hover:bg-custom-green/20 text-neutral-500 border-neutral-500 hover:text-neutral-800 hover:border-neutral-800 cursor-pointer hover:rounded-[3rem] focus:rounded-[3rem] transition-all ease-in-out`}
          >
            <Pencil size={20} />
            <div className="hidden group-hover:block">Edit</div>
          </Link>
          <Link
            to={"/transactions/new"}
            title="Hapus kantong"
            className={`group w-fit flex items-center justify-center gap-2 rounded-xl p-3 hover:px-5 text-sm border-2 border-dashed hover:bg-custom-red/40 text-neutral-500 border-neutral-500 hover:text-neutral-800 hover:border-neutral-800 cursor-pointer hover:rounded-[3rem] focus:rounded-[3rem] transition-all ease-in-out`}
          >
            <Trash size={20} />
            <div className="hidden group-hover:block">Hapus</div>
          </Link>
        </div>
      </DetailHeader>

      {!loading && wallet.transaction.length !== 0 && (
        <div className="grid grid-cols-4 gap-3">
          {/* detail kategori */}
          <div className="sticky top-5 space-y-2 h-fit">
            <div className="">Detail</div>
            <div
              className={`${walletColor(wallet.color).background} rounded-xl w-full p-5 space-y-3`}
            >
              <div>
                <div className="text-sm text-neutral-600">Periode</div>
                <div className="">{periode}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-600">Total transaksi</div>
                <div className="">IDR {moneyFormat(wallet.total)}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-600">Uang masuk</div>
                <div className="">IDR {moneyFormat(wallet.debit)}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-600">Uang keluar</div>
                <div className="">IDR {moneyFormat(wallet.credit)}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-600">Saldo awal</div>
                <div className="">
                  IDR {moneyFormat(wallet.initial_balance)}
                </div>
              </div>
              <div>
                <div className="text-sm text-neutral-600">Catatan</div>
                <div className="line-clamp-2">{wallet.note ?? "—"}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-600">Dibuat pada</div>
                <div className="">{dateFormat(wallet.created_at)}</div>
              </div>
            </div>
          </div>
          {/* loading */}
          {loading && (
            <div className="bg-custom-red/10 rounded-xl w-full h-fit sticky top-5 p-5 space-y-3">
              <Skeleton
                height={"h-12"}
                width={"aspect-square"}
                color={"bg-custom-red/20"}
              />
              <Skeleton
                height={"h-12"}
                width={"w-full"}
                color={"bg-custom-red/20"}
              />
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton
                    height={"h-4"}
                    width={"w-1/2"}
                    color={"bg-custom-red/20"}
                  />
                  <Skeleton
                    height={"h-6"}
                    width={"w-full"}
                    color={"bg-custom-red/20"}
                  />
                </div>
              ))}
            </div>
          )}

          {/* daftar transaksi */}
          <div className="col-span-3 space-y-2">
            <div className="">Daftar transaksi</div>
            {/* daftar */}
            {wallet.transaction.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                id={transaction.id}
                icon={
                  transaction.direction == "in"
                    ? "ArrowDownLeft"
                    : "ArrowUpRight"
                }
                name={transaction.category.name}
                date={dateFormat(transaction.date, "short-date")}
                desc={transaction.note}
                amount={`IDR ${transactionDirection(transaction.direction)}${moneyFormat(transaction.amount)}`}
                transactionDirection={transaction.direction}
              />
            ))}
            {/* loading */}
            {loading &&
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} width={"w-full"} height={"h-12"} />
              ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
