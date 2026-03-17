export default function Skeleton({ width, height, color }) {
  return (
    <div
      className={`animate-pulse ${width} ${height} ${color ?? "bg-neutral-200"} rounded-xl`}
    ></div>
  );
}
