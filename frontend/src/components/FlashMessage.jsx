import { Check, Info, TriangleAlert, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function FlashMessage({ flash }) {
  // icon
  const icon = {
    success: Check,
    info: Info,
    alert: TriangleAlert,
    failed: X,
  };
  const Icon = icon[flash.type] ?? Info;

  // warna
  const color = {
    success: "bg-custom-green/5 border-custom-green/20 text-custom-green",
    info: "bg-custom-blue/5 border-custom-blue/20 text-custom-blue",
    alert: "bg-custom-yellow/5 border-custom-yellow/20 text-custom-yellow",
    failed: "bg-red-500/5 border-red-500/20 text-red-500",
  };
  return (
    <div
      className={`z-50 fixed bottom-10 right-10 max-w-1/2 rounded-xl bg-custom-light`}
    >
      <div className={`border ${color[flash.type] ?? color["success"]} rounded-xl p-3 flex gap-1`}>
        <Icon className="shrink-0" />
        <div className="">
          {flash.message}{" "}
          {flash.url && (
            <Link
              to={flash.url.link}
              className="inline underline underline-offset-2 decoration-2"
            >
              {flash.url.text ?? "Lihat"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
