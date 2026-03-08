// layout untuk tampilan
import Nav from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex gap-5 mr-5">
      {/* nav */}
      <Nav />

      <div className="w-full">
        {/* content */}
        <main className="w-full mt-3 space-y-3">{children}</main>
        {/* footer */}
        <footer className="p-5 w-full text-center">Copyright 2026 Muklis</footer>
      </div>
    </div>
  );
}
