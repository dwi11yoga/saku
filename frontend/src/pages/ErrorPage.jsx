import DashboardLayout from "../layouts/DashboardLayout";

export default function ErrorPage({ title, status, message }) {
  return (
    <DashboardLayout title={title}>
      <div className="h-[80vh] flex items-center justify-center">
        <div className="">
          <h1 className="">{status}</h1>
          <div className="max-w-64">{message}</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
