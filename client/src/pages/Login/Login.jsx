import { useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config/config";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuthContext } from "../../context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { username, password } = formData;
  const { isSignUp, setIsSignUp, setAccessToken, setRefreshToken } =
    useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        console.log(response);
        const { accessToken, refreshToken } = response.data;

        //set accessstoken
        Cookies.set("accessToken", accessToken, {
          expires: 1 / 24,
          secure: true,
        });
        //set refreshtoken
        Cookies.set("refreshToken", refreshToken, {
          expires: 7,
          secure: true,
        });

        const storedAccessToken = Cookies.get("accessToken");
        setAccessToken(storedAccessToken);

        const storedRefreshToken = Cookies.get("refreshToken");
        setRefreshToken(storedRefreshToken);

        setError("");
        setIsSignUp(false);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError(error.response.data.message);
      }
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="p-3 flex flex-col w-full justify-center items-center overflow-x-hidden ">
      <img className="w-14" src={logo} alt="logo" />
      {isSignUp && (
        <div className="p-3 text-lime-500  font-semibold">
          You have Created Your Account Succesfully, Now Log in
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="border-2 border-solid flex flex-col justify-center w-2/6 items-center gap-2 rounded-2xl p-5 "
      >
        <div className="text-red-600 font-semibold">{error}</div>
        <h2 className="text-2xl mb-1">Sign in</h2>
        <div className="flex flex-col  w-full justify-center items-start gap-1 "></div>
        <div className="flex flex-col w-full justify-center items-start gap-1">
          <label htmlFor="username" className="font-semibold text-sm">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border w-full rounded-md p-1 outline-cyan-300"
            name="username"
            value={username}
            onChange={handleChange}
            required
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col w-full justify-center items-start gap-1">
          <label htmlFor="password" className="font-semibold text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border w-full rounded-md p-1 outline-cyan-300"
            name="password"
            value={password}
            onChange={handleChange}
            minLength={6}
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5"
        >
          Login
        </button>
        <h4 className="text-sm ">
          By creating an account, you agree to Shop house
          <Link href="#a" className="text-blue-700">
            {" "}
            Conditions of Use
          </Link>{" "}
          and{" "}
          <Link href="#a" className="text-blue-700">
            Privacy Notice
          </Link>
          .
        </h4>
        <h5 className="text-sm ">
          New to Shop house?
          <Link to={"/signup"} className="text-blue-700">
            {" "}
            Create your account
          </Link>
        </h5>
      </form>
    </div>
  );
};
export default Login;
