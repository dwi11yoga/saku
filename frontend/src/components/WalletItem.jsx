import { Link } from "react-router-dom";
import { moneyFormat } from "../utils/format";
import walletColor from "../utils/walletColor";

export default function WalletItem({ wallet, walletsLength }) {
  return (
    <Link
      key={wallet.id}
      to={`/kantong/${wallet.id}`}
      className={`flex ${walletsLength ?? "aspect-square"} flex-col justify-between rounded-xl p-5 hover:p-6 transition-all ${walletColor(wallet.color).background} ${walletColor(wallet.color).hover}`}
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
