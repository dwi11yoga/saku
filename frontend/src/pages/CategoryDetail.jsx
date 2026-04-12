import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import * as LucideIcons from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import TransactionItem from "../components/TransactionItem";
import { dateFormat, moneyFormat, transactionDirection } from "../utils/format";
import Skeleton from "../components/Skeleton";
import ErrorPage from "./ErrorPage";
import DetailHeader from "../components/DetailHeader";
import { ArrowDownLeft, ArrowUpRight, Pencil, Plus, Trash } from "lucide-react";

export default function CategoryDetail() {
  //   dapatkan id kategori
  const { id } = useParams();

  //   dapatkan data kategori
  const [category, setCategory] = useState({ transaction: [] });
  const [loading, setLoading] = useState(true);
  const [failLoadData, setFailLoadData] = useState(false);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/categories/${id}`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        setFailLoadData({
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
  if (category.transaction.length == 0) {
    periode = dateFormat(category.created_at);
  } else if (
    new Date(category.firstTransaction).getDate() ===
    new Date(category.latestTransaction).getDate()
  ) {
    periode = dateFormat(category.firstTransaction);
  } else {
    periode = `${dateFormat(category.firstTransaction, "short-date")} - ${dateFormat(category.latestTransaction, "short-date")}`;
  }

  console.log(category.transaction.length);

  // jika data tidak ditemukan
  if (failLoadData)
    return (
      <ErrorPage
        title={"Detail kategori"}
        status={failLoadData.status}
        message={failLoadData.message}
      />
    );

  return (
    <DashboardLayout title={`Detail kategori`}>
      {/* header */}
      <DetailHeader>
        {/* judul */}
        <div className={`flex items-center justify-center gap-1`}>
          {category.icon} {category.name}
        </div>

        {/* jumlah transaksi */}
        <div className="text-5xl text-custom-green font-bold">
          {category.transaction_count === 0
            ? "Belum ada transaksi"
            : `${category.transaction_count} Transaksi`}
        </div>

        {/* uang masuk & keluar */}
        <div className="flex justify-center gap-2 text-neutral-600">
          <div className="flex items-center gap-1" title="Transaksi masuk">
            <ArrowDownLeft size={18} />
            IDR {moneyFormat(category.debit)}
          </div>
          |
          <div
            className="flex items-center text-red-500"
            title="Transaksi keluar"
          >
            <ArrowUpRight size={18} /> IDR {moneyFormat(category.credit)}
          </div>
        </div>

        {/* aksi */}
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
            to={`/categories/${category.id}/edit`}
            title="Edit kategori"
            className={`group w-fit flex items-center justify-center gap-2 rounded-xl p-3 hover:px-5 text-sm border-2 border-dashed hover:bg-custom-green/20 text-neutral-500 border-neutral-500 hover:text-neutral-800 hover:border-neutral-800 cursor-pointer hover:rounded-[3rem] focus:rounded-[3rem] transition-all ease-in-out`}
          >
            <Pencil size={20} />
            <div className="hidden group-hover:block">Edit</div>
          </Link>
          <Link
            to={"/transactions/new"}
            title="Hapus kategori"
            className={`group w-fit flex items-center justify-center gap-2 rounded-xl p-3 hover:px-5 text-sm border-2 border-dashed hover:bg-custom-red/40 text-neutral-500 border-neutral-500 hover:text-neutral-800 hover:border-neutral-800 cursor-pointer hover:rounded-[3rem] focus:rounded-[3rem] transition-all ease-in-out`}
          >
            <Trash size={20} />
            <div className="hidden group-hover:block">Hapus</div>
          </Link>
        </div>
      </DetailHeader>

      {!loading && category.transaction.length !== 0 && (
        <div className="grid grid-cols-4 gap-3">
          {/* detail kategori */}
          {/* {!loading && ( */}
          <div className="sticky top-5 space-y-2 h-fit">
            <div className="bg-custom-red/10 rounded-xl w-full h-fit   p-5 space-y-3">
              {/* <div className="w-fit rounded-xl text-4xl">{category.icon}</div> */}
              {/* <h1>{category.name}</h1> */}
              <div>
                <div className="text-sm text-neutral-600">Periode</div>
                <div className="">{periode}</div>
              </div>
              {/* <div>
              <div className="text-sm text-neutral-600">Jumlah transaksi</div>
              <div className="">{category.transaction_count} kali</div>
            </div> */}
              <div>
                <div className="text-sm text-neutral-600">
                  Selisih transaksi
                </div>
                <div className="">IDR {moneyFormat(category.total)}</div>
              </div>
              {/* <div>
              <div className="text-sm text-neutral-600">Transaksi masuk</div>
              <div className="">IDR {moneyFormat(category.debit)}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Transaksi keluar</div>
              <div className="">IDR {moneyFormat(category.credit)}</div>
            </div> */}
              <div>
                <div className="text-sm text-neutral-600">Catatan</div>
                <div className="line-clamp-2">{category.note ?? "—"}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-600">Dibuat pada</div>
                <div className="">{dateFormat(category.created_at)}</div>
              </div>

              {/* opsi */}
              {/* <div className="rounded-full p-3 bg-custom-red/10 hover:bg-custom-red/20 flex justify-center items-center gap-1 w-full">
              <CircleEllipsis size={20} />
              <div className="">Menu</div>
            </div> */}
            </div>
          </div>
          {/* )} */}
          {/* loading */}
          {/* {loading && (
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
        )} */}

          {/* daftar transaksi */}
          <div className="col-span-3 space-y-2">
            {/* daftar */}
            {category.transaction.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                id={transaction.id}
                icon={
                  transaction.direction == "in"
                    ? "ArrowDownLeft"
                    : "ArrowUpRight"
                }
                name={dateFormat(transaction.date)}
                date={dateFormat(transaction.date, "time")}
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
