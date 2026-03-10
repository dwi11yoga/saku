import { useEffect, useState } from "react";
import { dateFormat, moneyFormat } from "../../utils/format";
import axios from "axios";
import * as LucideIcons from "lucide-react";

export default function LatestTransaction() {
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
    <div className="space-y-2">
      {/* judul */}
      <div className="">Transaksi terbaru</div>

      <div className="space-y-1">
        {transactions.map((transaction) => {
          const Icon = LucideIcons[transaction.category.icon];
          return (
            <div
              key={transaction.id}
              className="flex justify-between items-center border border-custom-green/10 rounded-xl p-5"
            >
              <div className="flex items-center gap-3">
                <Icon />
                <div className="">
                  <div className="">{transaction.category.name}</div>
                  <div className="text-neutral-600 text-sm">
                    {dateFormat(transaction.date)}
                  </div>
                </div>
              </div>
              <div className="text-lg">{moneyFormat(transaction.amount, true)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
