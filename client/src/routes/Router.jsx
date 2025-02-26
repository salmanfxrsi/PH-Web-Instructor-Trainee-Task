import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import SendMoney from "../pages/user/SendMoney";
import CashOut from "../pages/user/CashOut";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import SystemBalanceOverview from "../pages/admin/SystemBalanceOverview";
import UserTransactionHistory from "../pages/user/UserTransactionHistory";
import UserAgentManagement from "../pages/admin/user agent management/UserAgentManagement";
import UserHistory from "../pages/admin/UserHistory";
import AgentHistory from "../pages/admin/AgentHistory";
import Home from "../pages/home/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* User Routes */}
        <Route path="send-money" element={<SendMoney />} />
        <Route path="cash-out" element={<CashOut />} />
        <Route path="user-transaction-history" element={<UserTransactionHistory />} />

        {/* Admin Routes */}
        <Route path="system-balance-overview" element={<SystemBalanceOverview />} />
        <Route path="user-agent-management" element={<UserAgentManagement />} />
        <Route path="user-history/:id" element={<UserHistory />} />
        <Route path="agent-history/:mobile" element={<AgentHistory />} />
      </Route>
    </Routes>
  );
};

export default Router;
