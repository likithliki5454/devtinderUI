import React from "react";
import { useSelector } from "react-redux";

const UserCard = (props) => {
  const {userdata}=props

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 px-4">
      
      {userdata &&
        userdata.length > 0 &&
        userdata.slice(0, 1).map((item) => (
          <div
            key={item._id}
            className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="h-80 w-full">
              <img
                src={item.photoUrl || "https://via.placeholder.com/300"}
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 text-white">
              <h2 className="text-2xl font-bold">
                {item.name}
              </h2>

              <p className="text-sm opacity-80 mb-3">
                {item.age && `${item.age} years`}
              </p>
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-between mt-6">
                <button className="w-14 h-14 rounded-full bg-red-500/90 hover:bg-red-600 transition text-xl">
                  ✕
                </button>

                <button className="w-14 h-14 rounded-full bg-green-500/90 hover:bg-green-600 transition text-xl">
                  ✓
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserCard;
