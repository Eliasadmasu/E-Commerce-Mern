import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/NavBar/Navbar";
import Login from "./pages/Login/Login";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";
import Home from "./pages/Home/Home";
import ProductList from "./components/ProductsList/ProductList";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Admin from "./pages/Admin/Admin";
import Orders from "./pages/Admin/Orders/Orders";
import Customers from "./pages/Admin/Customers/Customers";
import Reports from "./pages/Admin/Reports/Reports";
import Product from "./pages/Admin/Product/Product";
import DashBoard from "./pages/Admin/DashBorad/DashBoard";
import UpdateProducts from "./pages/Admin/UpdateProducts/UpdateProducts";
import Error404 from "./components/Error/Error404";
import Cookies from "js-cookie";
import CartItems from "./pages/CartItems/CartItems";
import PaymentSuccess from "./pages/CartItems/CheckOut/PaymentSuccess";
import OrderDetail from "./pages/Admin/Orders/OrderDetail/OrderDetail";
import Profile from "./pages/Admin/Profile/Profile";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  const role = Cookies.get("role");

  const location = useLocation();

  const isSignUpPage =
    location.pathname === "/signup" || location.pathname === "/login";
  // admin check
  const isAdminCheck = () => {
    return role === "admin"; // Return true if role is "admin", otherwise false
  };

  return (
    <div className="App">
      {!isSignUpPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        {isAdminCheck() && (
          <Route path="/adminDashBoard/create" element={<AdminDashBoard />} />
        )}
        {/* admin menu */}
        {isAdminCheck() && (
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Product />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route>
              <Route path="orders" element={<Orders />} />
              <Route
                path="/admin/orders-detail/:orderId"
                element={<OrderDetail />}
              />
            </Route>
            <Route path="customers" element={<Customers />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        )}
        {/* admin menu */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/cart-list" element={<CartItems />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />
        {isAdminCheck() && (
          <Route path="/update/:productId" element={<UpdateProducts />} />
        )}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
