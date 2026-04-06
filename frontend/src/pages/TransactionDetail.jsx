import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axios";
import * as LucideIcons from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { dateFormat, moneyFormat, transactionDirection } from "../utils/format";
import Insight from "../components/transaction-detail/insight";
import TransactionDetailSkeleton from "../skeleton/TransactionDetailSkeleton";

export default function TransactionDetail() {
  // dapatkan id transaksi
  const { id } = useParams();
  // dapatkan data transaksi
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/transaction/${id}`)
      .then((res) => {
        setTransaction(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // jika masih loading...
  if (loading) {
    return <TransactionDetailSkeleton />;
  }

  //   icon
  const TransactionIcon =
    transaction.direction === "in"
      ? LucideIcons["ArrowDownLeft"]
      : LucideIcons["ArrowUpRight"];

  return (
    <DashboardLayout title={`Detail transaksi`}>
      {/* info utama */}
      <div className="flex justify-center items-center gap-5 py-10">
        {/* icon */}
        <div
          className={`${transaction.direction === "in" ? "text-custom-green bg-custom-green/10" : "text-red-600 bg-custom-red/20"} w-fit h-fit`}
        >
          <TransactionIcon size={62} />
        </div>

        <div className="">
          {/* kategori */}
          <Link
            to={`/kategori/${transaction.category?.id}`}
            className="text-neutral-600 hover:text-neutral-800 flex gap-1 group items-center"
          >
            {transaction.category?.name}
            <LucideIcons.ArrowRight
              className="group-hover:block hidden"
              size={18}
            />
          </Link>
          {/* jumlah uang */}
          <div className="text-5xl font-semibold">
            {transactionDirection(transaction?.direction)}
            {moneyFormat(transaction.amount ?? 0)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {/* insight */}
        <div className="">
          <Insight transactionDirection={transaction.direction} />
        </div>
        {/* detail transaksi */}
        <div className="col-span-3 space-y-2">
          {/* id transaksi */}
          <div
            className={`${transaction.direction === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} p-5 hover:px-7 rounded-xl hover:rounded-[3rem] transition-all ease-in-out`}
          >
            <div className="text-sm text-neutral-600 flex gap-1">
              <LucideIcons.Hash size={18} />
              ID Transaksi
            </div>
            <div className="">{transaction.id}</div>
          </div>
          {/* Jenis transaksi */}
          <div
            className={`${transaction.direction === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} p-5 hover:px-7 rounded-xl hover:rounded-[3rem] transition-all ease-in-out`}
          >
            <div className="text-sm text-neutral-600 flex gap-1">
              <LucideIcons.ArrowLeftRight size={18} />
              Jenis transaksi
            </div>
            <div className="">
              {transaction.direction === "in" ? "Debit" : "Credit"}
            </div>
          </div>
          {/* kantong */}
          <div
            className={`${transaction.direction === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} p-5 hover:px-7 rounded-xl hover:rounded-[3rem] transition-all ease-in-out group`}
          >
            <div className="text-sm text-neutral-600 flex gap-1">
              <LucideIcons.WalletMinimal size={18} />
              Kantong
            </div>
            <Link
              to={`/kantong/${transaction.wallet?.id}`}
              className={`${transaction.direction === "in" ? "hover:bg-custom-green/10" : "hover:bg-custom-red/20"} rounded-full group-hover:px-2`}
            >
              {transaction.wallet?.name}
            </Link>
          </div>
          {/* lokasi */}
          <div
            className={`${transaction.direction === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} group p-5 hover:px-7 rounded-xl hover:rounded-[3rem] transition-all ease-in-out`}
          >
            <div className="text-sm text-neutral-600 flex gap-1">
              <LucideIcons.Map size={18} />
              Lokasi
            </div>
            {!transaction.location ? '—' : (
              <div className="flex items-center">
              <Link
                to={`/lokasi/${transaction.location}`}
                className={`${transaction.direction === "in" ? "hover:bg-custom-green/10" : "hover:bg-custom-red/20"} rounded-full group-hover:px-2`}
              >
                {transaction.location}
              </Link>
              <Link
                to={`https://www.google.com/maps/search/${transaction.location}`}
                target="_blank"
                title="Lihat di google maps"
                className={`group-hover:opacity-100 opacity-0 flex items-center w-fit transition-all ease-in-out ${transaction.direction === "in" ? "hover:bg-custom-green/10" : "hover:bg-custom-red/20"} rounded-full group-hover:px-2 text-sm`}
              >
                Google maps
                <LucideIcons.ArrowUpRight size={20} />
              </Link>
            </div>
            )}
          </div>
          {/* tanggal */}
          <div
            className={`${transaction.direction === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} p-5 hover:px-7 rounded-xl hover:rounded-[3rem] transition-all ease-in-out`}
          >
            <div className="text-sm text-neutral-600 flex gap-1">
              <LucideIcons.Calendar size={18} />
              Tanggal
            </div>
            <div className="">{dateFormat(transaction.date)}</div>
          </div>
          {/* waktu */}
          <div
            className={`${transaction.direction === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} p-5 hover:px-7 rounded-xl hover:rounded-[3rem] transition-all ease-in-out`}
          >
            <div className="text-sm text-neutral-600 flex gap-1">
              <LucideIcons.Clock size={18} />
              Waktu
            </div>
            <div className="">{dateFormat(transaction.date, "time")}</div>
          </div>
          {/* note */}
          <div
            className={`${transaction.direction === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} p-5 hover:px-7 rounded-xl hover:rounded-[3rem] transition-all ease-in-out`}
          >
            <div className="text-sm text-neutral-600 flex gap-1">
              <LucideIcons.NotepadText size={18} />
              Catatan
            </div>
            <div className="">{transaction.note ?? "—"}</div>
          </div>
          {/* created-at */}
          <div
            className={`${transaction.direction === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} p-5 hover:px-7 rounded-xl hover:rounded-[3rem] transition-all ease-in-out`}
          >
            <div className="text-sm text-neutral-600 flex gap-1">
              <LucideIcons.CalendarPlus size={18} />
              Dibuat pada
            </div>
            <div className="">
              {dateFormat(transaction.created_at, "full-datetime")}
            </div>
          </div>
          {/* updated-at */}
          <div
            className={`${transaction.direction === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} p-5 hover:px-7 rounded-xl hover:rounded-[3rem] transition-all ease-in-out`}
          >
            <div className="text-sm text-neutral-600 flex gap-1">
              <LucideIcons.CalendarArrowUp size={18} />
              Diperbarui pada
            </div>
            <div className="">
              {dateFormat(transaction.updated_at, "full-datetime")}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
