import axios from "axios";
import { Plus, WalletMinimal } from "lucide-react";
import { useEffect, useState } from "react";
import { moneyFormat } from "../../utils/format";
import { Link } from "react-router-dom";

export default function Wallets() {
  // data kantong/walet
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/wallets").then((res) => {
      setWallets(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* wallet */}
      <div className="col-span-2 flex gap-2 overflow-auto rounded-xl">
        {wallets.map((wallet) => {
          var background;
          var hover;
          switch (wallet.color) {
            case "yellow":
              background = "bg-custom-yellow";
              hover = "hover:bg-custom-yellow/20";
              break;
            case "red":
              background = "bg-custom-red";
              hover = "hover:bg-custom-red/20";
              break;
            default:
              background = "bg-custom-green";
              hover = "hover:bg-custom-green/20";
              break;
          }
          return (
            <Link
              to={"/"}
              className={`flex ${wallets.length > 1 ? "aspect-square w-1/2" : "w-full"} flex-col justify-between rounded-xl p-5 ${background}/10 hover:
            ${hover}`}
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
        })}
      </div>
      <div className="space-y-2 grid grid-rows-2 gap-2 aspect-square">
        <div className="bg-custom-green/10 rounded-xl p-5 h-full flex items-center gap-2 hover:bg-custom-green/30 transition-all duration-100 cursor-pointer">
          <Plus />
          <span>Tambah transaksi</span>
        </div>
        <div className="bg-custom-green/10 rounded-xl p-5 h-full flex items-center gap-2 hover:bg-custom-green/30 transition-all duration-100 cursor-pointer">
          <WalletMinimal />
          <span>Tambah kantong</span>
        </div>
      </div>
    </div>
  );
}
