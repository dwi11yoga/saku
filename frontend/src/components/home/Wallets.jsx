import axios from "../../utils/axios";
import { Plus, WalletMinimal } from "lucide-react";
import { useEffect, useState } from "react";
import WalletItem from "../WalletItem";
import { Link } from "react-router-dom";

export default function Wallets() {
  // data kantong/walet
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    axios.get("/wallets", { params: { user_id: 1 } }).then((res) => {
      setWallets(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* wallet */}
      <div className={`col-span-2 flex gap-2 overflow-x-auto rounded-xl`}>
        {wallets.map((wallet) => (
          <WalletItem
            key={wallet.id}
            wallet={wallet}
            walletsLength={
              wallets.length > 1 ? "w-1/2 aspect-square" : "w-full"
            }
          />
        ))}
      </div>
      <div className="space-y-2 grid grid-rows-2 gap-2 aspect-square">
        <Link
          to={"/transaksi/tambah"}
          className="bg-custom-green/10 rounded-xl p-5 h-full flex items-center gap-2 hover:bg-custom-green/30 transition-all duration-100 cursor-pointer"
        >
          <Plus />
          <span>Tambah transaksi</span>
        </Link>
        <Link
          to={"/kantong/tambah"}
          className="bg-custom-green/10 rounded-xl p-5 h-full flex items-center gap-2 hover:bg-custom-green/30 transition-all duration-100 cursor-pointer"
        >
          <WalletMinimal />
          <span>Tambah kantong</span>
        </Link>
      </div>
    </div>
  );
}
