import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("likipinky@gmail.com");
  const [password, setPassword] = useState("1057@Liki");
  const [errors, setErrors] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const HandleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        emailId: email,
        password: password,
      }, {withCredentials:true});
      console.log(res.data);
      dispatch(addUser(res.data))
      navigate('/')
    } catch (err) {
      setErrors(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-blue-100 card-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

          {/* Email */}
          <fieldset className="fieldset w-full">
            <p className="fieldset-legend">Email Id</p>
            <input
              type="text"
              className='input w-full p-5'
              placeholder="Type here"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset w-full">
            <p className="fieldset-legend">Password</p>
            <input
              type="password"
              className={`input w-full p-5 ${
                errors ? "border-red-500" : ""
              }`}
              placeholder="Type here"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors && (
              <p className="text-red-600 text-sm mt-1">{errors}</p>
            )}
          </fieldset>

          <div className="card-actions mt-4">
            <button
              className="btn w-full bg-amber-800 hover:bg-amber-900 text-white border-none"
              onClick={HandleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
