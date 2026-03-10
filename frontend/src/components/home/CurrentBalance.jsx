import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { moneyFormat } from "../../utils/format";

export default function CurrentBalance() {
  // balance
  const [balance, setBalance] = useState(0);
  // pertumbuhan uang
  const [growth, setGrowth] = useState(0);
  // persentase pertumbuhan uang
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/current-balance").then((res) => {
      setBalance(Number(res.data.balance));
      setGrowth(Number(res.data.growth));
      setPercentage(res.data.percentage);
    });
  }, []);
  return (
    <div className="p-5 flex flex-col justify-between rounded-xl border-2 border-custom-green">
      <div className="flex justify-between">
        <div className="">Total saldo</div>
        {/* persentase */}
        <div className={`text-sm rounded-full ${percentage > 0 ? 'bg-custom-green': 'bg-custom-red'} text-custom-light h-fit px-3 py-1.5 flex`}>
          <ArrowUpRight width="20" height="20" />
          {percentage.toFixed(2)}%
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="">IDR</div>
          <div className="text-5xl font-semibold text-custom-green">
            {moneyFormat(balance)}
          </div>
        </div>
        <div className="text-sm text-neutral-600">
          {growth > 0 ? "Bertambah" : "Berkurang"} IDR{" "}
          <span
            className={`${growth > 0 ? "text-custom-green" : "text-custom-red"} font-semibold`}
          >
            {moneyFormat(Math.abs(growth))}
          </span>{" "}
          dibanding bulan sebelumnya.
        </div>
      </div>
    </div>
  );
}
