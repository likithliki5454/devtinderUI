import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "./utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // STEP 1 — Verify Email
  const handleForgotpasswordEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        API_URL + "/profile/verify-email", // ✅ FIXED
        { email }
      );

      toast.success(res.data.message || "Email verified successfully ✅");
      setShowPasswordForm(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Email verification failed ❌");
      setShowPasswordForm(false);
    }
  };

  // STEP 2 — Update Password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newpassword !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    try {
      const res = await axios.patch(
        API_URL + "/profile/forgotpassword",
        { email, newpassword }
      );
      toast.success(res.data.message || "Password updated successfully ✅");
      navigate("/login");
      
    } catch (err) {
        toast.error(err.response?.data?.message || "Password update failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Change Password
        </h2>


        {/* EMAIL FORM */}
        {!showPasswordForm && (
          <form onSubmit={handleForgotpasswordEmail} className="space-y-5">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Submit
            </button>
          </form>
        )}

        {/* PASSWORD FORM */}
        {showPasswordForm && (
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <input
              type="password"
              placeholder="New password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <button className="w-full bg-green-600 text-white py-2 rounded-lg">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
