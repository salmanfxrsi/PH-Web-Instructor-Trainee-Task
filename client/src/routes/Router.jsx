import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";

const Router = () => {
  return (
    <Routes>
      <Route index element={<MainLayout />} />
    </Routes>
  );
};

export default Router;
