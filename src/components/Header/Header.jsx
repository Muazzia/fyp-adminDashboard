import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex px-4 py-4 bg-main text-white">
      <Link to={"/"} className="font-bold cursor-pointer">
        Skin Guardian
      </Link>
    </div>
  );
};

export default Header;
