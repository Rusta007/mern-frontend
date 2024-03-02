import React from "react";
import SignUpPage from "./SignUpPage";
import Banner from "../../common/component/Banner";

function LoginIndex() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 md:flex md:justify-center md:items-center bg-[#baa0cd]">
        <Banner />
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
        <div className="max-w-md w-full">
          <SignUpPage />
        </div>
      </div>
    </div>
  );
}

export default LoginIndex;
