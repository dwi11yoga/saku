// import semua icon
import * as LucideIcons from "lucide-react";
import { Link } from "react-router-dom";

export default function TransactionItem({ icon, name, desc, amount, date }) {
  const Icon = icon ? LucideIcons[icon] : "";
  return (
    <Link
      to={"/"}
      className={`flex justify-between items-center gap-5 bg-custom-green/5 hover:bg-custom-green/10 focus:bg-custom-green/10 hover:rounded-full focus:rounded-full rounded-xl p-5`}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon />}
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
      <div className="text-lg text-nowrap">{amount}</div>
    </Link>
  );
}
