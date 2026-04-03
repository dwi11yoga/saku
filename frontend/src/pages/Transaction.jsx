import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import TransactionItem from "../components/TransactionItem";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleX,
} from "lucide-react";
import { dateFormat, moneyFormat, transactionDirection } from "../utils/format";
import Skeleton from "../components/Skeleton";
import ErrorPage from "./ErrorPage";

export default function Transaction() {
  // search param
  const [searchParam, setSearchParam] = useSearchParams();
  // bulan dan tahun
  const [month, setMonth] = useState(
    searchParam.get("month") || new Date().getMonth() + 1,
  );
  const [year, setYear] = useState(
    searchParam.get("year") || new Date().getFullYear(),
  );
  // data
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failLoadData, setFailLoadData] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/transactions", {
        params: {
          groupby: true,
          month: month,
          year: year,
        },
      })
      .then((res) => {
        // set parameter
        setSearchParam({ month, year });
        // set data transaksi
        setTransactions(res.data);
      })
      .catch((err) => {
        setFailLoadData({
          status: err.response?.status,
          message: err.response?.data.message,
        });
      })
      .finally(() => {
        // ubah status loading
        setLoading(false);
      });
  }, [month, year]);

  // jika tidak berhasil mengambil data dari db..
  if (failLoadData) {
    return (
      <ErrorPage
        title={"Transaksi"}
        status={failLoadData.status}
        message={failLoadData.message}
      />
    );
  }

  // ubah bulan
  function changeMonth(operation) {
    const selectedMonth = Number(month);
    setLoading(true);
    setTransactions([]);
    if (operation == "add") {
      // jika tambah
      if (selectedMonth == 12) {
        setMonth(1);
        setYear(Number(year) + 1);
      } else {
        setMonth(selectedMonth + 1);
      }
    } else {
      // jika kurang
      if (selectedMonth == 1) {
        setMonth(12);
        setYear(Number(year) - 1);
      } else {
        setMonth(selectedMonth - 1);
      }
    }
  }

  // ubah tahun
  function changeYear(operation) {
    const selectedYear = Number(year);
    setTransactions([]);
    if (operation === "add") {
      setYear(selectedYear + 1);
    } else {
      setYear(selectedYear - 1);
    }
  }

  return (
    <DashboardLayout title={"Transaksi"}>
      {/* tab */}

      {/* pindah bulan & tanggal */}
      <div className="flex py-5 divide-x divide-neutral-200">
        {/* bulan */}
        <div className="flex items-center px-3">
          <div className="">Bulan</div>
          <input
            id="month"
            type="text"
            value={new Date(year, month - 1).toLocaleDateString("id-ID", {
              month: "short",
            })}
            onChange={(e) => setMonth(e.target.value)}
            min={1}
            max={12}
            disabled
            className="w-10 text-center outline-none focus:underline underline-offset-4 decoration-4 decoration-custom-green"
          />
          <button
            className="hover:bg-custom-green/10 active:bg-custom-green/20 rounded-full p-1"
            onClick={() => changeMonth("sub")}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="hover:bg-custom-green/10 active:bg-custom-green/20 rounded-full p-1"
            onClick={() => changeMonth("add")}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        {/* tahun */}
        <div className="flex items-center px-3">
          <div className="">Tahun</div>
          <input
            id="month"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min={1}
            max={12}
            className="w-11 text-center outline-none focus:underline underline-offset-4 decoration-4 decoration-custom-green"
          />
          <button
            className="hover:bg-custom-green/10 active:bg-custom-green/20 rounded-full p-1"
            onClick={() => changeYear("sub")}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="hover:bg-custom-green/10 active:bg-custom-green/20 rounded-full p-1"
            onClick={() => changeYear("add")}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* isi konten */}
      {/* skeleton (loadiing) */}
      {loading && (
        <div className="space-y-5">
          <div className="space-y-3">
            <Skeleton width={"w-20"} height={"h-7"} />
            <div className="grid grid-cols-4 gap-3">
              <div className="w-full col-span-3 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} width={"w-full"} height={"h-12"} />
                ))}
                {/* <Skeleton width={"w-full"} height={"h-12"} />
                <Skeleton width={"w-full"} height={"h-12"} /> */}
              </div>
              <div className="w-full">
                <Skeleton width={"w-full"} height={"h-48"} />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton width={"w-20"} height={"h-7"} />
            <div className="grid grid-cols-4 gap-3">
              <div className="w-full col-span-3 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} width={"w-full"} height={"h-12"} />
                ))}
                {/* <Skeleton width={"w-full"} height={"h-12"} />
                <Skeleton width={"w-full"} height={"h-12"} /> */}
              </div>
              <div className="w-full">
                <Skeleton width={"w-full"} height={"h-48"} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* daftar transaksi */}
      {/* pakai object karena dari backend mengembalikan object, bukan array */}
      <div className="space-y-5">
        {Object.entries(transactions).map(([day, items]) => {
          const debit = items.reduce(
            (sum, item) =>
              item.direction === "in" ? sum + item.amount : sum + 0,
            0,
          );
          const credit = items.reduce(
            (sum, item) =>
              item.direction === "out" ? sum + item.amount : sum + 0,
            0,
          );
          const total = debit - credit;
          return (
            <div key={day} className="space-y-3">
              <div className="">{dateFormat(day)}</div>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-3 space-y-3">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <TransactionItem
                        key={item.id}
                        id={item.id}
                        name={item.category.name}
                        icon={item.category.icon}
                        amount={`IDR ${transactionDirection(item.direction)}${moneyFormat(item.amount)}`}
                        desc={item.note}
                        date={`pada ${dateFormat(item.date, "time")}`}
                        transactionDirection={item.direction}
                      />
                    ))}
                  </div>
                </div>
                {/* overview */}
                <div
                  className={`sticky top-5 ${total > 0 ? "bg-custom-green/10" : "bg-custom-red/20"} p-5 rounded-xl h-fit space-y-3`}
                >
                  {/* judul */}
                  {total > 0 ? (
                    <div className="flex gap-1">
                      <ArrowUpRight />
                      <div className="">Profit</div>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <ArrowDownLeft />
                      <div className="">Defisit</div>
                    </div>
                  )}
                  {/* jumlah pertumbuhan uang */}
                  <div className="flex items-start gap-1">
                    {/* <span>IDR </span> */}
                    <span
                      className={`text-3xl font-semibold ${total > 0 ? "text-custom-green" : "text-red-600"}`}
                    >
                      {moneyFormat(total)}
                    </span>
                  </div>
                  {/* debit & credit */}
                  <div className="">
                    <div className="flex justify-between">
                      <div className="">Total uang masuk</div>
                      <div className="text-custom-green">
                        {moneyFormat(debit)}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="">Total uang keluar</div>
                      <div className="text-red-600">{moneyFormat(credit)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* jika data kosong */}
      {!loading && transactions.length === 0 && (
        <div className="flex gap-3 rounded-xl bg-custom-green/5 p-5">
          <CircleX />
          <div className="">Belum ada data</div>
        </div>
      )}
    </DashboardLayout>
  );
}
