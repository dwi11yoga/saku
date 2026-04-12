import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  ArrowLeftRight,
  ChartPie,
  Tags,
  Settings,
  Info,
  PanelLeftOpen,
  PanelRightOpen,
  Wallet,
  History,
} from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const [expanded, setExpanded] = useState(false);

  // daftar menu
  const menus = [
    { path: "/", label: "Home", icon: Home },
    { path: "/transactions", label: "Transaksi", icon: History },
    { path: "/wallets", label: "Kantong", icon: Wallet },
    { path: "/categories", label: "Kategori", icon: Tags },
    { path: "/statistics", label: "Statistik", icon: ChartPie },
    { path: "/settings", label: "Pengaturan", icon: Settings },
  ];
  return (
    <div>
      <nav
        className={`flex flex-col p-2 h-screen sticky top-0 gap-8 border-r border-neutral-200 overflow-hidden ${expanded ? "min-w-52" : "w-fit"}`}
      >
        {/* judul/nama web */}
        <div className="font-bold flex justify-between items-center">
          {expanded && (
            <div className="ml-2 text-lg text-custom-green">saku.</div>
          )}

          <div
            onClick={() => setExpanded(!expanded)}
            className="p-3 cursor-pointer rounded-xl hover:bg-custom-green/30"
            title={expanded ? "Tutup" : "Buka"}
          >
            {expanded ? (
              <PanelRightOpen width={20} height={20} />
            ) : (
              <PanelLeftOpen width={20} height={20} />
            )}
          </div>
        </div>

        {/* menu */}
        <div className="space-y-1">
          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <NavLink
                key={menu.label}
                to={menu.path}
                className={({ isActive }) =>
                  `flex gap-2 items-center p-3 text-sm rounded-xl focus:rounded-3xl hover:rounded-3xl hover:bg-custom-green/20 ${expanded && 'hover:px-5'} transition-all ease-in-out
        ${isActive ? "text-custom-green bg-custom-green/10" : "text-neutral-600"}`
                }
              >
                <Icon width={20} height={20} />
                {expanded && <div>{menu.label}</div>}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
