// layout
import DashboardLayout from "../layouts/DashboardLayout";
import LatestTransaction from "../components/home/LatestTransaction";
import Cashflow from "../components/home/Cashflow";
import CurrentBalance from "../components/home/CurrentBalance";
import Wallets from "../components/home/Wallets";

export default function Dashboard() {
  
  return (
    <DashboardLayout title={'Selamat malam, Muklis!'}>
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
