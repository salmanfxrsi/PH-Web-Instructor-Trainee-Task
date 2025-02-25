import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import SendMoney from "../pages/user/SendMoney";
import CashOut from "../pages/user/CashOut";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="send-money" element={<SendMoney />} />
        <Route path="cash-out" element={<CashOut />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default Router;
