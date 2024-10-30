import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Product from "../components/RightSideBar/Product/Product";
import Order from "../components/RightSideBar/Order/Order";
import SignIn from "./SignIn";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      { path: "", element: <Product /> },
      { path: "order", element: <Order /> },
    ],
  },
]);

export default router;
