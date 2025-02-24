import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-[#010313] min-h-screen py-2">
      {/* Navigation Bar */}
      <nav className="w-11/12 mx-auto">
        <Navbar />
      </nav>

      {/* Main Content Area */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer>{/* TODO: Footer content can be added here */}</footer>
    </div>
  );
};

export default MainLayout;
