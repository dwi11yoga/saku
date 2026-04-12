import { useParams } from "react-router-dom";
import DetailHeader from "../components/DetailHeader";
import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import TransactionItem from "../components/TransactionItem";
import { dateFormat, moneyFormat } from "../utils/format";

export default function LocationDetail() {
  const title = "Detail lokasi";
  // nama lokasi
  const { name } = useParams();

  //   dapatkan data transaksi
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios
      .get("/transactions", {
        params: {
          location: name,
        },
      })
      .then((res) => {
        setTransactions(res.data);
      });
  }, []);

  console.log(transactions);

  return (
    <DashboardLayout title={title}>
      {/* bagian atas/header */}
      <DetailHeader>
        <div className="space-y-2 w-full flex flex-col items-center">
          <div className="">{name}</div>
          <iframe
            src={`https://maps.google.com/maps?q=${name}&ie=UTF8&iwloc=&output=embed`}
            className="w-[80%] h-48 rounded-xl border-2 border-neutral-200"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </DetailHeader>

      {/* daftar transaksi */}
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            id={transaction.id}
            name={transaction.category.name}
            amount={`IDR ${moneyFormat(transaction.amount)}`}
            desc={transaction.note}
            date={dateFormat(transaction.date, "short-date")}
            icon={transaction.category.icon}
            iconType={"emoji"}
            transactionDirection={transaction.direction}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
