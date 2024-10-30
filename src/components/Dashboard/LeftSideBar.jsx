import { Link, useLocation } from "react-router-dom";
import cn from "../../utils/cn";

const LeftSideBar = () => {
  const loc = useLocation();
  return (
    <div className="px-2 py-2 h-full">
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className={cn(
              `text-md font-bold hover:underline ${
                loc.pathname === "/" && "text-main"
              }`
            )}
            to={"/"}
          >
            Product
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              `text-md font-bold hover:underline ${
                loc.pathname === "/order" && "text-main fond-bold"
              }`
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
