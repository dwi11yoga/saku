export default function Skeleton({ width, height }) {
  return (
    <div
      className={`animate-pulse ${width} ${height} bg-neutral-200 rounded-xl`}
    ></div>
  );
}
