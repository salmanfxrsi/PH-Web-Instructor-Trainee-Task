import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/authentication/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Router;
