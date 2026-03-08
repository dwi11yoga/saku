import { ArrowUpRight, ArrowDownLeft, Plus, WalletMinimal } from "lucide-react";

// layout
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/transactions", {
        params: {
          limit: 5,
        },
      })
      .then((res) => {
        setTransactions(res.data);
        // console.log(res.data);
      });
  }, []);
  return (
    <DashboardLayout>
      {/* judul */}
      {/* <Title
        title="Dashboard"
        subtitle="Illo maiores repudiandae ipsa eos. Occaecati vel qui praesentium nemo
          et aliquid ut iure. Ipsam eveniet officiis vero nihil exercitationem
          et magni odio. Illo eveniet necessitatibus officiis adipisci."
      /> */}
      {/* bagian atas */}
      <div className="flex justify-between items-center">
        {/* sapaan */}
        <div className="">Selamat siang, Muklis.</div>
        {/* foto profil  */}
        <div className="rounded-full overflow-hidden w-10 aspect-square">
          <img
            className="object-cover"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdata.ipic.ai%2Fimages%2F83qQIwWeStgmXj5_1712263013.png"
            alt=""
          />
        </div>
        {/* <h1 className="text-2xl text-custom-green">1.250.000,00</h1> */}
      </div>

      {/* saldo dan kantong */}
      <div className="grid grid-cols-2 gap-3">
        {/* total saldo */}
        <div className="p-5 flex flex-col justify-between rounded-xl border-2 border-custom-green">
          <div className="flex justify-between">
            <div className="">Total saldo</div>
            {/* persentase */}
            <div className="text-sm rounded-full bg-custom-green text-custom-light h-fit px-3 py-1.5 flex">
              <ArrowUpRight width="20" height="20" />
              20,59%
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="">IDR</div>
              <div className="text-5xl font-semibold text-custom-green">
                1.252.000,00
              </div>
            </div>
            <div className="text-sm text-neutral-600">
              Bertambah{" "}
              <span className="text-custom-green font-semibold">
                IDR 120.000
              </span>{" "}
              dibanding bulan sebelumnya.
            </div>
          </div>
        </div>

        {/* kantong */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col justify-between aspect-square rounded-xl p-5 bg-custom-green/10">
            <div className="">Dompet</div>
            <div className="text-custom-green text-lg font-semibold">
              IDR 1.000.000
            </div>
          </div>
          <div className="flex flex-col justify-between aspect-square rounded-xl p-5 bg-custom-green/10">
            <div className="">BRI</div>
            <div className="text-custom-green text-lg font-semibold">
              IDR 1.000.000
            </div>
          </div>
          <div className="space-y-2 grid grid-rows-2 gap-2 aspect-square">
            <div className="bg-custom-green/10 rounded-xl p-5 h-full flex items-center gap-2 hover:bg-custom-green/30 transition-all duration-100 cursor-pointer">
              <Plus />
              <span>Tambah transaksi</span>
            </div>
            <div className="bg-custom-green/10 rounded-xl p-5 h-full flex items-center gap-2 hover:bg-custom-green/30 transition-all duration-100 cursor-pointer">
              <WalletMinimal />
              <span>Tambah kantong</span>
            </div>
          </div>
          {/* <div className="flex flex-col justify-between aspect-square rounded-xl p-5 bg-custom-green/10">
            <div className="">BRI</div>
            <div className="text-custom-green text-lg font-semibold">
              IDR 1.000.000
            </div>
          </div> */}
        </div>
      </div>

      {/* content / detail */}
      <div className="grid grid-cols-2 gap-3">
        {/* cash flow dan riwayat */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {/* cash flow */}
            <div className="space-y-2">
              {/* uang masuk */}
              <div className="rounded-xl bg-custom-green/10 p-5 space-y-5">
                <div className="flex gap-1">
                  <ArrowDownLeft />
                  Uang masuk
                </div>
                <div className="text-lg text-custom-green">
                  IDR <span className="font-semibold">520.000</span>
                </div>
              </div>
              {/* uang keluar */}
              <div className="rounded-xl bg-custom-red/20 p-5 space-y-5">
                <div className="flex gap-1">
                  <ArrowUpRight />
                  Uang keluar
                </div>
                <div className="text-lg text-red-500">
                  IDR <span className="font-semibold">520.000</span>
                </div>
              </div>
            </div>

            {/* grafik income/outcome */}
            <div className="col-span-2 p-5 bg-custom-green/10 rounded-xl">
              grafik income dan outcome dalam 7 hari terakhir
            </div>
          </div>
          {/* daftar transaksi terbaru */}
          <div className="space-y-2">
            <div className="">Transaksi terbaru</div>
            <div className="space-y-1">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center border border-custom-green/10 rounded-xl p-5">
                  <div className="">
                    <div className="">{transaction.category.name}</div>
                    <div className="text-neutral-600 text-sm">{transaction.date.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="text-lg">IDR{transaction.amount.toLocaleString('id-ID')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* statistik */}
        <div className="space-y-3">
          {/* ai summary */}
          <div className="bg-custom-green/10 rounded-xl p-5">AI Summary</div>
          <div className="bg-custom-green/10 rounded-xl p-5">
            Struktur pengeluaran (berdasarkan kategori)
          </div>
          <div className="bg-custom-green/10 rounded-xl p-5">
            Pemasukan dan pengeluaran dibanding bulan kemarin
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
