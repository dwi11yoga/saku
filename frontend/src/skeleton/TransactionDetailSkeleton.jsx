import Skeleton from "../components/Skeleton";
import DashboardLayout from "../layouts/DashboardLayout";

export default function TransactionDetailSkeleton() {
  return (
    <DashboardLayout title={`Detail transaksi`}>
      <div className="flex justify-center items-center gap-5 py-10">
        {/* icon */}
        <Skeleton width={"w-20 aspect-square"} />

        <div className="space-y-1">
          {/* kategori */}
          <Skeleton width={"w-20"} height={"h-6"} />
          {/* jumlah uang */}
          <Skeleton width={"w-62"} height={"h-14"} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {/* insight */}
        <div className="space-y-2">
          <Skeleton width={"w-1/2"} height={"h-6"} />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} width={"w-full"} height={"h-20"} />
          ))}
        </div>
        {/* detail transaksi */}
        <div className="col-span-3 space-y-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} width={"w-full"} height={"h-16"} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
