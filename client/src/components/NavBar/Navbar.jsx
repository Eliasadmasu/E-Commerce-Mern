import { useState } from "react";
import Logo from "../../assets/logo.svg";
import "./navbar.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";
import { RiAdminLine, RiHomeSmileFill } from "react-icons/ri";
import { IoStorefront } from "react-icons/io5";
import Search from "../Search/Search";
import { useAuthContext } from "../../context/UserContext";

const Navbar = () => {
  const { cartItemCount, role } = useAuthContext();

  const [hasRefreshToken, setHasRefreshToken] = useState(
    !!Cookies.get("refreshToken")
  );

  return (
    <div className="flex justify-between p-3  navbarCont">
      <Link to={"/"}>
        <img src={Logo} alt="imglogo" className="logoimg" />
      </Link>
      <div className="centerNavbar">
        <Search />
        <div className="txt">
          <Link to={"/"}>
            <RiHomeSmileFill /> Home
          </Link>
          <Link to={"/product"}>
            <IoStorefront />
            Shop
          </Link>
        </div>
      </div>
      {!hasRefreshToken ? (
        <div className="flex gap-4 font-medium logsigncartCont">
          <Link to={"/login"} className="buttonNavbar login  ">
            Login
          </Link>
          <Link to={"signup"} className="buttonNavbar  signup">
            Sign Up
          </Link>
          <Link to={"/cart-list"}>
            <div className="    flex justify-center items-center gap-1 buttonNavbar  cart ">
              <HiShoppingCart />
              Cart
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex gap-6 font-medium normaluserCont">
          {role === "admin" ? (
            <Link to={"/admin"} className="adminNavbar">
              <RiAdminLine size={20} />
            </Link>
          ) : (
            <Link to={"/user-profile"} className="buttonNavbar user">
              <div className="userCtnCont">User</div>
            </Link>
          )}
          <Link className="adminNavbar count" to={"/cart-list"}>
            <HiShoppingCart size={20} className="cartLogo" />
            <div className="countCart">{cartItemCount}</div>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navbar;
