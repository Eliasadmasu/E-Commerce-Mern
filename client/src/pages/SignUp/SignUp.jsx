import { useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config/config";
import axios from "axios";
import { useAuthContext } from "../../context/UserContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const { username, password, fullName, email, phoneNumber, gender } = formData;
  const navigate = useNavigate();
  const { setIsSignUp } = useAuthContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        username,
        password,
        fullName,
        email,
        phoneNumber,
        gender,
      });
      if (response.status === 201) {
        console.log(response);
        setIsSignUp(true);
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setError(error.response.data.message);
        setIsSignUp(false);
      }
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="p-3 flex flex-col w-full justify-center items-center overflow-x-hidden ">
      <img className="w-14" src={logo} alt="logo" />
      {error}
      <form
        onSubmit={handleSubmit}
        className="border-2 border-solid flex flex-col justify-center w-2/6 items-center gap-2 rounded-2xl p-5  bg-white"
      >
        <div className="text-red-600 font-semibold">{error}</div>
        <h2 className="text-2xl mb-1">Create Account</h2>
        <div className="flex flex-col  w-full justify-center items-start gap-1 ">
          <label htmlFor="fullName" className="font-semibold text-sm">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="border w-full rounded-md p-1 outline-cyan-300 h-7"
            value={fullName}
            onChange={handleChange}
            placeholder="First and last name"
            required
          />
        </div>
        <div className="flex flex-col w-full justify-center items-start gap-1">
          <label htmlFor="username" className="font-semibold text-sm">
            Username{" "}
            <span className="text-xs text-sky-600 ml-3">
              {" "}
              <span className="text-red-600">Remember: </span> you need to this
              for login
            </span>
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
            placeholder="At least 6 characters"
            required
          />
        </div>

        <div className="flex flex-col w-full justify-center items-start gap-1">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border w-full rounded-md p-1 outline-cyan-300"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Email address"
          />
        </div>
        <div className="flex flex-col w-full justify-center items-start gap-1">
          <label htmlFor="phoneNumber" className="font-semibold text-sm">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="border w-full rounded-md p-1 outline-cyan-300"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            required
            placeholder="Phone number"
          />
        </div>
        <div className="flex w-full gap-4">
          <label htmlFor="gender" className="font-semibold text-sm">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={handleChange}
            className="border font-semibold text-sm"
            required
          >
            <option value="" className="">
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button
          type="submit"
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5"
        >
          Sign Up
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
          Already have an account?
          <Link to={"/login"} className="text-blue-700">
            {" "}
            Sign in
          </Link>
        </h5>
      </form>
    </div>
  );
};
export default SignUp;
