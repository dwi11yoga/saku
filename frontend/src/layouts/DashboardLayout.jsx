// layout untuk tampilan
import { useEffect } from "react";
import Nav from "../components/Navbar";
import setTitle from "../utils/PageTitle";

export default function DashboardLayout({ children, title }) {
  useEffect(() => {
    setTitle(title);
  });
  return (
    <div className="flex gap-5 mr-5">
      {/* nav */}
      <Nav />

      <div className="w-full">
        {/* content */}
        <main className="w-full mt-3 space-y-3 min-h-screen">
          {/* bagian atas */}
          <div className="flex justify-between items-center">
            {/* sapaan */}
            <div className="">{title}</div>
            {/* foto profil  */}
            <div className="rounded-full overflow-hidden w-10 aspect-square">
              <img
                className="object-cover"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdata.ipic.ai%2Fimages%2F83qQIwWeStgmXj5_1712263013.png"
                alt=""
              />
            </div>
            {/* <h1 className="text-2xl text-custom-green">1.250.000,00</h1> */}
          </div>
          {children}
        </main>
        {/* footer */}
        <footer className="p-5 w-full text-center">
          Copyright 2026 Muklis
        </footer>
      </div>
    </div>
  );
}
