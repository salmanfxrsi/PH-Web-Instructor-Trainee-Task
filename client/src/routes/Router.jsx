import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import SendMoney from "../pages/user/SendMoney";
import CashOut from "../pages/user/CashOut";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import SystemBalanceOverview from "../pages/admin/SystemBalanceOverview";
import UserTransactionHistory from "../pages/user/UseTransactionHistory";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Common Routes */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        {/* Auth Related Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* User Routes */}
        <Route path="send-money" element={<SendMoney />} />
        <Route path="cash-out" element={<CashOut />} />
        <Route
          path="user-transition-history"
          element={<UserTransactionHistory />}
        />

        {/* Admin Routes */}
        <Route
          path="system-balance-overview"
          element={<SystemBalanceOverview />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
