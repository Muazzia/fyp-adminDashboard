import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Product from "../components/RightSideBar/Product/Product";
import Order from "../components/RightSideBar/Order/Order";
import SignIn from "./SignIn";
import ProtectedRoutes from "./ProtectedRoutes";
import ForgotPassword from "./ForgotPassword";
import Otp from "../components/NewPassword/Otp";
import Password from "../components/NewPassword/Password";
import NewPassword from "./NewPassword";

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
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      { path: "", element: <Product /> }, // This will render for "/"
      { path: "order", element: <Order /> }, // This will render for "/order"
    ],
  },
]);

export default router;
