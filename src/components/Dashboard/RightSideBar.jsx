import { Outlet } from "react-router-dom";

const RightSideBar = () => {
  return (
    <div className="px-2 py-2">
      <Outlet />
    </div>
  );
};

export default RightSideBar;
