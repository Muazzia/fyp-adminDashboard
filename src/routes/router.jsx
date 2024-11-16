import { createBrowserRouter } from "react-router-dom";
import { LayoutWithHeader } from "../components/layout/Layout";
import Otp from "../components/NewPassword/Otp";
import Password from "../components/NewPassword/Password";
import Order from "../components/RightSideBar/Order/Order";
import Product from "../components/RightSideBar/Product/Product";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";
import ProtectedRoutes from "./ProtectedRoutes";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
    children: [
      { path: "", element: <Otp /> }, // This will render for "/new-password"
      { path: "password", element: <Password /> }, // This will render for "/new-password/password"
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <LayoutWithHeader>
          <Dashboard />
        </LayoutWithHeader>
      </ProtectedRoutes>
    ),
    children: [
      { path: "", element: <Product /> }, // This will render for "/"
      { path: "order", element: <Order /> }, // This will render for "/order"
    ],
  },
  {
    path: "/resetPassword",
    element: (
      <ProtectedRoutes>
        <LayoutWithHeader>
          <ResetPassword />
        </LayoutWithHeader>
      </ProtectedRoutes>
    ),
  },
]);

export default router;
