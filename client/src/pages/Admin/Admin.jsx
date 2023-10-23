import "./admin.css";
import { Grid } from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { BsCartFill } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import {
  SidebarContainer,
  StyledMainContainer,
  StyledSideBarMenu,
} from "./adminstyle";
import { Link, Outlet, useLocation } from "react-router-dom";

const Admin = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "") {
      return location.pathname === "/admin";
    }
    return location.pathname === `/admin/${path}`;
  };

  return (
    <StyledMainContainer>
      <Grid className="GridCont" container columns={12}>
        <SidebarContainer item xs={2} className="sidebarCont">
          <Link to="/admin" className={`${isActive("") ? "active" : ""}`}>
            <StyledSideBarMenu className="sidebarmenu">
              <BiSolidShoppingBags size={23} />
              Products
            </StyledSideBarMenu>
          </Link>
          <Link
            to="/admin/dashboard"
            className={`${isActive("dashboard") ? "active" : ""}`}
          >
            <StyledSideBarMenu className="sidebarmenu">
              <MdDashboard size={23} /> Dashboard
            </StyledSideBarMenu>
          </Link>
          <Link
            to="/admin/orders"
            className={`${isActive("orders") ? "active" : ""}`}
          >
            <StyledSideBarMenu className="sidebarmenu">
              <BsCartFill size={23} /> Orders
            </StyledSideBarMenu>
          </Link>
          <Link
            to="/admin/customers"
            className={`${isActive("customers") ? "active" : ""}`}
          >
            <StyledSideBarMenu className="sidebarmenu">
              <MdPeopleAlt size={23} />
              Customers
            </StyledSideBarMenu>
          </Link>
          <Link
            to="/admin/profile"
            className={`${isActive("profile") ? "active" : ""}`}
          >
            <StyledSideBarMenu className="sidebarmenu">
              <FaUserCircle size={23} />
              Profile
            </StyledSideBarMenu>
          </Link>
        </SidebarContainer>
        <Grid item xs={10} className="sidebarComp">
          <Outlet />
        </Grid>
      </Grid>
    </StyledMainContainer>
  );
};
export default Admin;
