import { Link, useLocation } from "react-router-dom";
import cn from "../../utils/cn";

const LeftSideBar = () => {
  const loc = useLocation();
  return (
    <div className="px-2 py-2 h-full">
      <ul>
        <li>
          <Link
            className={cn(`${loc.pathname === "/" && "text-main fond-bold"}`)}
            to={"/"}
          >
            Product
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              `${loc.pathname === "/order" && "text-main fond-bold"}`
            )}
            to={"order"}
          >
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftSideBar;
