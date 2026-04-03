export default function Insight({ transactionDirection }) {
  // PERINGKAT
  // transaksi pertama kategori ini?
  // transaksi pertama kategori ini di bulan ini?
  //   transaksi terbesar untuk kategori ini
  //   RATA-RATA
  //   % lebih kecil dari rata-rata pengeluaran bulan ini
  //   MILESTONE
  // pengeluaran terbesar dalam 2 bulan terkahir

  return (
    <div className="col-span-1 space-y-5 sticky top-5">
      <div className="space-y-2">
        <div className="">Insight</div>
        <div className="space-y-2">
          {/* item */}
          <div
            className={`p-5 ${transactionDirection === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} rounded-tl-none rounded-xl hover:rounded-tl-none hover:rounded-4xl transition-all ease-in-out`}
          >
            Ini transaksi anda ke-20 untuk kategori ini.
          </div>
          <div
            className={`p-5 ${transactionDirection === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} rounded-tl-none rounded-xl hover:rounded-tl-none hover:rounded-4xl transition-all ease-in-out`}
          >
            Transaksi ini lebih besar 20% dari rata-rata pengeluaran bulan ini.
          </div>
          <div
            className={`p-5 ${transactionDirection === "in" ? "bg-custom-green/5 hover:bg-custom-green/10" : "bg-custom-red/10 hover:bg-custom-red/20"} rounded-tl-none rounded-xl hover:rounded-tl-none hover:rounded-4xl transition-all ease-in-out`}
          >
            Transaksi ini merupakan pengeluaran terbesar anda dalam 3 bulan terakhir
          </div>
        </div>
      </div>
    </div>
  );
}
