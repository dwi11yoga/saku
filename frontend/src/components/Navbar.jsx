import { Link } from "react-router-dom";
import {
  Home,
  ArrowLeftRight,
  ChartPie,
  Tags,
  Settings,
  Info,
  PanelLeftOpen,
  PanelRightOpen,
} from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <nav
        className={`flex flex-col p-2 h-screen sticky top-0 gap-8 border-r border-neutral-200 overflow-hidden ${expanded ? "min-w-52" : "w-fit"}`}
      >
        {/* judul/nama web */}
        <div className="font-bold flex justify-between items-center">
          {expanded && <div className="ml-2 text-lg text-custom-green">saku.</div>}

          <div onClick={() => setExpanded(!expanded)} className="p-3 cursor-pointer rounded-xl hover:bg-custom-green/30" title={expanded ? 'Tutup':'Buka'}>
            {expanded ? (
              <PanelRightOpen width={20} height={20} />
            ) : (
              <PanelLeftOpen width={20} height={20} />
            )}
          </div>
        </div>

        {/* menu */}
        <div className="space-y-1">
          <Link
            to={"/"}
            className="flex gap-2 items-center p-3 rounded-xl hover:bg-custom-green/30 text-sm"
          >
            <Home width={20} height={20} />
            {expanded && <div>Home</div>}
          </Link>
          <Link
            to={"/transaksi"}
            className="flex gap-2 items-center p-3 rounded-xl hover:bg-custom-green/30 text-sm"
          >
            <ArrowLeftRight width={20} height={20} />
            {expanded && <div>Transaksi</div>}
          </Link>
          <Link
            to={"/statistik"}
            className="flex gap-2 items-center p-3 rounded-xl hover:bg-custom-green/30 text-sm"
          >
            <ChartPie width={20} height={20} />
            {expanded && <div>Statistik</div>}
          </Link>
          <Link
            to={"/kategori"}
            className="flex gap-2 items-center p-3 rounded-xl hover:bg-custom-green/30 text-sm"
          >
            <Tags width={20} height={20} />
            {expanded && <div>Kategori</div>}
          </Link>
          <Link
            to={"/pengaturan"}
            className="flex gap-2 items-center p-3 rounded-xl hover:bg-custom-green/30 text-sm"
          >
            <Settings width={20} height={20} />
            {expanded && <div>Pengaturan</div>}
          </Link>
          <Link
            to={"/tentang"}
            className="flex gap-2 items-center p-3 rounded-xl hover:bg-custom-green/30 text-sm"
          >
            <Info width={20} height={20} />
            {expanded && <div>Tentang</div>}
          </Link>
        </div>
      </nav>
    </div>
  );
}
