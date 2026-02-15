import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "./Components/utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "./Components/utils/constants";
import axios from "axios";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => {
    return store.user;
  });

  const handleLogout = async () => {
    try {
      await axios.post(
        API_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfile=()=>{
    navigate("/profile");
  }

  const HandleHome=()=>{
    if(!user)
    navigate("/login");
  else{
    navigate("/");
  }
  }

  return (
    <div>
      {" "}
      <div className="navbar bg-base-content  text-base-content text-neutral-content">
        <div className="flex-1" onClick={HandleHome}>
          <Link to="/" className="text-xl">
            DevTinder
          </Link>
        </div>
        <div className="flex gap-2">
          {user && (
            <div className="dropdown dropdown-end mx-5 flex">
              <p className="px-4  my-2">Welcome {user.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl || "https://via.placeholder.com/150"}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-base-content"
              >
                <li onClick={handleProfile}>
                  <Link  className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogout}>
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
