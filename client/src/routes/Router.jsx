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
import PrivateRoutes from "./PrivateRoutes";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import AgentRoutes from "./AgentRoutes";
import AgentCashOutTransaction from "../pages/agent/AgentCashOutTransaction";

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

        {/* Private User Routes */}
        <Route
          path="send-money"
          element={
            <PrivateRoutes>
              <UserRoutes>
                <SendMoney />
              </UserRoutes>
            </PrivateRoutes>
          }
        />
        <Route
          path="cash-out"
          element={
            <PrivateRoutes>
              <UserRoutes>
                <CashOut />
              </UserRoutes>
            </PrivateRoutes>
          }
        />
        <Route
          path="user-transaction-history"
          element={
            <PrivateRoutes>
              <UserRoutes>
                <UserTransactionHistory />
              </UserRoutes>
            </PrivateRoutes>
          }
        />

        {/* Private Agent Routes */}
        <Route
          path="agent-cash-out-transaction"
          element={
            <PrivateRoutes>
              <AgentRoutes>
                <AgentCashOutTransaction />
              </AgentRoutes>
            </PrivateRoutes>
          }
        />

        {/* Private Admin Routes */}
        <Route
          path="system-balance-overview"
          element={
            <PrivateRoutes>
              <AdminRoutes>
                <SystemBalanceOverview />
              </AdminRoutes>
            </PrivateRoutes>
          }
        />
        <Route
          path="user-agent-management"
          element={
            <PrivateRoutes>
              <AdminRoutes>
                <UserAgentManagement />
              </AdminRoutes>
            </PrivateRoutes>
          }
        />
        <Route
          path="user-history/:id"
          element={
            <PrivateRoutes>
              <AdminRoutes>
                <UserHistory />
              </AdminRoutes>
            </PrivateRoutes>
          }
        />
        <Route
          path="agent-history/:mobile"
          element={
            <PrivateRoutes>
              <AdminRoutes>
                <AgentHistory />
              </AdminRoutes>
            </PrivateRoutes>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
