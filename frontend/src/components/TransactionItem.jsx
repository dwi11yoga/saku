// import semua icon
import * as LucideIcons from "lucide-react";
import { Link } from "react-router-dom";

export default function TransactionItem({
  id,
  icon,
  name,
  desc,
  amount,
  date,
  transactionDirection
}) {
  const Icon = icon ? LucideIcons[icon] : "";
  return (
    <Link
      to={`/transaksi/${id}`}
      className={`${transactionDirection === 'out' ? 'bg-custom-red/10 hover:bg-custom-red/20 focus:bg-custom-red/20': 'bg-custom-green/5 hover:bg-custom-green/10 focus:bg-custom-green/10'} flex justify-between items-center gap-5  hover:rounded-[3rem] hover:px-7 focus:rounded-[3rem] rounded-xl p-5 transition-all ease-in-out`}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          // kalau icon yang dipilih panah simbol uang masuk/keluar, beri warna
          <div
            className={
              icon == "ArrowDownLeft"
                ? "text-custom-green"
                : icon == "ArrowUpRight"
                  ? "text-red-500"
                  : ""
            }
          >
            <Icon />
          </div>
        )}
        <div className="">
          <div className="">
            {name}{" "}
            {date ? (
              <span className="text-xs text-neutral-500">{date}</span>
            ) : (
              ""
            )}
          </div>
          <div className="text-neutral-600 text-sm line-clamp-1">{desc}</div>
        </div>
      </div>
      <div className={`text-lg text-nowrap`}>{amount}</div>
    </Link>
  );
}
