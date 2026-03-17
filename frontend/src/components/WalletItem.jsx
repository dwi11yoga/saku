import { Link } from "react-router-dom";
import { moneyFormat } from "../utils/format";

export default function WalletItem({ wallet, walletsLength }) {
  var background;
  var hover;
  switch (wallet.color) {
    case "yellow":
      background = "bg-custom-yellow/10";
      hover = "hover:bg-custom-yellow/20";
      break;
    case "red":
      background = "bg-custom-red/10";
      hover = "hover:bg-custom-red/20";
      break;
    default:
      background = "bg-custom-green/10";
      hover = "hover:bg-custom-green/20";
      break;
  }
  return (
    <Link
      key={wallet.id}
      to={"/"}
      className={`flex ${walletsLength ?? 'aspect-square'} flex-col justify-between rounded-xl p-5 ${background} ${hover}`}
    >
      <div className="text-5xl">{wallet.icon}</div>
      <div className="">
        <div className="">{wallet.name}</div>
        <div className=" text-lg font-semibold">
          IDR {moneyFormat(wallet.balance)}
        </div>
      </div>
    </Link>
  );
}
