import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/NavBar/Navbar";
import Login from "./pages/Login/Login";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";

function App() {
  const location = useLocation();
  const isSignUpPage =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>
      {!isSignUpPage && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<div className="text-3xl font-bold ">Home</div>}
        />
        <Route path="/adminDashBoard" element={<AdminDashBoard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
