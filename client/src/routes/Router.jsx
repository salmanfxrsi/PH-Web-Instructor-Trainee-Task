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

        {/* Private Admin Routes */}
        <Route
          path="system-balance-overview"
          element={
            <PrivateRoutes>
              <SystemBalanceOverview />
            </PrivateRoutes>
          }
        />
        <Route
          path="user-agent-management"
          element={
            <PrivateRoutes>
              <UserAgentManagement />
            </PrivateRoutes>
          }
        />
        <Route
          path="user-history/:id"
          element={
            <PrivateRoutes>
              <UserHistory />
            </PrivateRoutes>
          }
        />
        <Route
          path="agent-history/:mobile"
          element={
            <PrivateRoutes>
              <AgentHistory />
            </PrivateRoutes>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
