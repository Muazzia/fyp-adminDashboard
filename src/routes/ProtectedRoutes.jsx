import { Navigate } from "react-router-dom";
import { LS_TOKEN } from "./../constants/index";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem(LS_TOKEN);
  if (!token) return <Navigate to={"/signin"} />;

  return <div>{children}</div>;
};

export default ProtectedRoutes;
