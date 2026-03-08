export default function Title({ title, subtitle }) {
  return (
    <div className="space-y-2 max-w-2/3">
      <h1 className="text-4xl font-bold text-custom-green">{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
