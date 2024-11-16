import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { LS_TOKEN } from "./../../constants/index";
import { Avatar, Dropdown } from "flowbite-react";
import cn from "../../utils/cn";
const Header = () => {
  const nav = useNavigate();

  const handleClick = () => {
    localStorage.setItem(LS_TOKEN, "");
    nav("/signin");
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-main text-white">
      <Link to={"/"} className="font-bold cursor-pointer">
        Skin Guardian
      </Link>
      <div className=" flex gap-3 items-center">
        <FaPowerOff
          size={22}
          onClick={handleClick}
          className="hover:cursor-pointer"
        />
        <DropDown />
      </div>
    </div>
  );
};

const DropDown = () => {
  const loc = useLocation();
  return (
    <div className="relative ">
      <Dropdown
        renderTrigger={() => (
          <div>
            <Avatar
              className="hover:cursor-pointer"
              size="xs"
              placeholderInitials="R"
              rounded
            />
          </div>
        )}
        label="Dropdown button"
        dismissOnClick={true}
      >
        <Dropdown.Item
          className={cn(
            `${
              loc.pathname === "/" && "bg-main text-white"
            } text-sm hover:text-black`
          )}
        >
          <Link to={"/"}>Dashboard</Link>
        </Dropdown.Item>
        <Dropdown.Item
          className={cn(
            `${
              loc.pathname === "/resetPassword" && "bg-main text-white"
            } text-sm hover:text-black`
          )}
        >
          <Link to={"/resetPassword"}>Change Passowrd</Link>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Header;
