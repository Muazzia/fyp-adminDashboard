import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { LS_TOKEN } from "./../../constants/index";
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
      <FaPowerOff onClick={handleClick} className="hover:cursor-pointer" />
    </div>
  );
};

export default Header;
