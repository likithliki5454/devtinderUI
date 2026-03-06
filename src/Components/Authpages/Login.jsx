import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/login`,
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setErrors(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen
    bg-gradient-to-br from-indigo-100 via-white to-purple-100
    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      <div className="w-96 p-6 rounded-2xl shadow-xl
      bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

        <h1 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Likith's APPs
        </h1>

        <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Email
          </label>

          <input
            type="text"
            className="mt-1 w-full px-4 py-2 rounded-lg border
            border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700
            text-gray-800 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Password
          </label>

          <input
            type="password"
            className={`mt-1 w-full px-4 py-2 rounded-lg border
            ${
              errors
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }
            bg-white dark:bg-gray-700
            text-gray-800 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors && (
            <p className="text-red-500 text-sm mt-1">{errors}</p>
          )}
        </div>

        {/* Button */}
        <button
          className="w-full mt-4 py-2 rounded-lg font-medium
          bg-indigo-600 hover:bg-indigo-700
          text-white transition duration-200"
          onClick={HandleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;