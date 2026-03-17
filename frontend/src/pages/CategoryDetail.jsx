import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as LucideIcons from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import TransactionItem from "../components/TransactionItem";
import { dateFormat, moneyFormat, transactionDirection } from "../utils/format";
import Skeleton from "../components/Skeleton";
import ErrorPage from "./ErrorPage";

export default function CategoryDetail() {
  //   dapatkan id kategori
  const { id } = useParams();

  //   dapatkan data kategori
  const [category, setCategory] = useState({ transaction: [] });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/categories/${id}`)
      .then((res) => {
        setCategory(res.data);
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

  // icon
  const Icon = LucideIcons[category.icon ?? "Loader"];
  console.log(notFound);

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
    <DashboardLayout title={`Detail kategori`}>
      <div className="grid grid-cols-4 gap-3">
        {/* detail kategori */}
        {!loading && (
          <div className="bg-custom-red/10 rounded-xl w-full h-fit sticky top-5 p-5 space-y-3">
            <div className="p-3 bg-custom-light/60 w-fit rounded-xl">
              <Icon size={32} />
            </div>
            <h1>{category.name}</h1>
            <div>
              <div className="text-sm text-neutral-600">Periode</div>
              <div className="">{periode}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Jumlah transaksi</div>
              <div className="">{category.transaction_count} kali</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Total transaksi</div>
              <div className="">IDR {moneyFormat(category.total)}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Transaksi masuk</div>
              <div className="">IDR {moneyFormat(category.debit)}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Transaksi keluar</div>
              <div className="">IDR {moneyFormat(category.credit)}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Catatan</div>
              <div className="line-clamp-2">{category.note ?? "—"}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Dibuat pada</div>
              <div className="">{dateFormat(category.created_at)}</div>
            </div>

            {/* opsi */}
            <div className="rounded-full p-3 bg-custom-red/10 hover:bg-custom-red/20 flex justify-center items-center gap-1 w-full">
              <LucideIcons.CircleEllipsis size={20} />
              <div className="">Menu</div>
            </div>
          </div>
        )}
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
              <div className="space-y-1">
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
          {/* tambah */}
          {!loading && (
            <button
              title="Tambah transaksi baru"
              className={`flex items-center justify-center gap-2 rounded-xl p-5 border-2 border-dashed border-custom-green opacity-40 hover:opacity-100 focus:opacity-100 cursor-pointer w-full ${category.transaction.length == 0 ? "h-full" : "hover:rounded-full focus:rounded-full"}`}
            >
              <LucideIcons.Plus size={20} />
              <div className="">Tambah transaksi</div>
            </button>
          )}

          {/* daftar */}
          {category.transaction.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              name={dateFormat(transaction.date, "full-datetime")}
              desc={transaction.note}
              amount={`IDR ${transactionDirection(transaction.direction)}${moneyFormat(transaction.amount)}`}
            />
          ))}
          {/* loading */}
          {loading &&
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton width={"w-full"} height={"h-12"} />
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
