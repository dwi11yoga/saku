import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, ArrowDownLeft, Plus, WalletMinimal } from "lucide-react";
import { dateFormat, moneyFormat } from "../utils/format";

// layout
import DashboardLayout from "../layouts/DashboardLayout";
import LatestTransaction from "../components/home/LatestTransaction";
import Cashflow from "../components/home/Cashflow";
import CurrentBalance from "../components/home/CurrentBalance";
import Wallets from "../components/home/Wallets";

export default function Dashboard() {
  return (
    <DashboardLayout>
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
        <CurrentBalance />

        {/* kantong/wallet */}
        <Wallets />
      </div>

      {/* content / detail */}
      <div className="grid grid-cols-2 gap-3">
        {/* cash flow dan riwayat */}
        <div className="space-y-3">
          {/* cashflow & statistik */}
          <Cashflow />
          {/* daftar transaksi terbaru */}
          <LatestTransaction />
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
