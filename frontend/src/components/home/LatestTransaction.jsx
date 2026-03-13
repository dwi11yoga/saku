import { useEffect, useState } from "react";
import { dateFormat, moneyFormat } from "../../utils/format";
import axios from "axios";
import * as LucideIcons from "lucide-react";
import TransactionItem from "../TransactionItem";

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
          const date = dateFormat(transaction.date);
          const amount = moneyFormat(transaction.amount);
          const direction = transaction.direction == "in" ? "+" : "-";
          return (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              name={transaction.category.name}
              desc={date}
              amount={`IDR ${direction}${amount}`}
              icon={transaction.category.icon}
            />
          );
        })}
      </div>
    </div>
  );
}
