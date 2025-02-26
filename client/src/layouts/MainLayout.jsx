import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-[#010313]">
      {/* Navigation Bar */}
      <nav className="w-11/12 mx-auto">
        <Navbar />
      </nav>

      {/* Main Content Area */}
      <main className="py-24 min-h-[calc(100vh-372px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="h-[308px]">
        <img
          className="h-full object-cover w-full"
          src="https://i.ibb.co.com/d4FDbvyw/city.webp"
          alt=""
        />
      </footer>
    </div>
  );
};

export default MainLayout;
