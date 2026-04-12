import axios from "../../utils/axios";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { moneyFormat } from "../../utils/format";

export default function Cashflow() {
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);

  useEffect(() => {
    axios.get("/cashflow").then((res) => {
      setDebit(res.data.debit);
      setCredit(res.data.credit);
    });
  }, []);
  return (
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
            IDR <span className="font-semibold">{moneyFormat(debit)}</span>
          </div>
        </div>
        {/* uang keluar */}
        <div className="rounded-xl bg-custom-red/20 p-5 space-y-5">
          <div className="flex gap-1">
            <ArrowUpRight />
            Uang keluar
          </div>
          <div className="text-lg text-red-500">
            IDR <span className="font-semibold">{moneyFormat(credit)}</span>
          </div>
        </div>
      </div>

      {/* grafik income/outcome */}
      <div className="col-span-2 p-5 bg-custom-green/10 rounded-xl">
        grafik income dan outcome dalam 7 hari terakhir
      </div>
    </div>
  );
}
