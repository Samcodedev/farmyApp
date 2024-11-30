import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../config/firebase";

const UserList = ({setIsAuth}) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Farmers" },
    { id: 3, name: "Marketers" },
    { id: 4, name: "Developers" },
  ];
  const cookies = new Cookies()

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
  }

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-bold_main">Join Chat</h2>
      <ul>
        {users.map((user) => (
        <Link to={`/chat/${user.name}`} className="text-main font-semibold">
          <li
            key={user.id}
            className="mb-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
              {user.name}
          </li>
        </Link>
        ))}
      </ul>
      <button onClick={signUserOut} class="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition ease-in-out duration-200">
        sign out
      </button>
    </div>
  );
};

export default UserList;
