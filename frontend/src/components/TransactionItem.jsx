// import semua icon
import * as LucideIcons from "lucide-react";

export default function TransactionItem({ icon, name, desc, amount, date }) {
  const Icon = icon ? LucideIcons[icon] : "";
  return (
    <div className="flex justify-between items-center border border-custom-green/10 rounded-xl p-5">
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
      <div className="text-lg">{amount}</div>
    </div>
  );
}
