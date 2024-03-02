import React from "react";
import Logout from "./Logout";
import ProfileIndex from "../../pages/profile/index"

function Header() {
  return (
    <>
      <header className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white">
        <h1 className="text-2xl font-semibold">Your App</h1>
        <Logout />
      </header>
      <ProfileIndex />
    </>
  );
}

export default Header;
