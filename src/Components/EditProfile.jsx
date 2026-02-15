import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import axios from "axios";
import { API_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const [editProfile, seteditProfile] = useState({
    firstName: user.firstName || "",
    age: user.age || "",
    photoUrl: user.photoUrl || "",
  });
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleSave = async () => {
    try {
      const res = await axios.patch(
        API_URL + "/profile/edit",
        {
          firstName: editProfile.firstName,
          age: editProfile.age,
          photoUrl: editProfile.photoUrl,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      toast.success(res.data.message);
    //   alert(res.data.message);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data.warning) {
        setErrors(err.response.data.warning);
        toast.error(err.response.data.warning);
      } else {
        setErrors("An error occurred while saving the profile.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="card w-96 bg-blue-100 card-sm shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            {/* Email */}
            <fieldset className="fieldset w-full">
              <p className="fieldset-legend">FirstName</p>
              <input
                type="text"
                className="input w-full p-5"
                placeholder="Type here"
                value={editProfile.firstName}
                onChange={(e) => {
                  seteditProfile({ ...editProfile, firstName: e.target.value });
                }}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <p className="fieldset-legend">Lastname</p>
              <input
                type="text"
                className="input w-full p-5"
                placeholder="Type here"
                value={editProfile.age}
                onChange={(e) => {
                  seteditProfile({ ...editProfile, age: e.target.value });
                }}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <p className="fieldset-legend">Photo</p>
              <input
                type="text"
                className="input w-full p-5"
                placeholder="Type here"
                value={editProfile.photoUrl}
                onChange={(e) => {
                  seteditProfile({ ...editProfile, photoUrl: e.target.value });
                }}
              />
            </fieldset>

            {errors && <p className="text-red-600 text-sm mt-1">{errors}</p>}

            <div className="card-actions mt-4">
              <button
                className="btn w-full bg-amber-800 hover:bg-amber-900 text-white border-none"
                onClick={HandleSave}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
