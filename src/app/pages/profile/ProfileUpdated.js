// ProfileUpdated.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileForm from "./ProfileForm";

function ProfileUpdated() {
  const location = useLocation();
  const [profileDetails, setProfileDetails] = useState(null);
  const [hasBackendData, setHasBackendData] = useState(false);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const email = localStorage.getItem("email");

      try {
        const response = await fetch(
          `https://mern-backend-kxg8.onrender.com/profile/${email}`
        );
        if (response.ok) {
          const data = await response.json();
          setProfileDetails(data);
          if (data.age) {
            setHasBackendData(true);
          }
        } else {
          console.error("Error fetching profile details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile details:", error.message);
      }
    };

    fetchProfileDetails();
  }, []);

  const handleHasBackend = () => {
    setHasBackendData(false);
  };

  const handleToggle = () => {
    setHasBackendData(true);
    console.log("profileForm")
    setTimeout(() => {
      fetchProfileDetails();
    }, 1000);
  };

  const fetchProfileDetails = async () => {
    const email = localStorage.getItem("email");

    try {
      const response = await fetch(`https://mern-backend-kxg8.onrender.com/profile/${email}`);
      if (response.ok) {
        const data = await response.json();
        setProfileDetails(data);
        setHasBackendData(true);
      } else {
        console.error("Error fetching profile details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching profile details:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {hasBackendData ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
          <div className="mb-4">
            <p>
              <span className="font-semibold">First Name:</span>{" "}
              {profileDetails?.firstName}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {profileDetails?.email}
            </p>
            <p>
              <span className="font-semibold">Age:</span> {profileDetails?.age}
            </p>
            <p>
              <span className="font-semibold">Mobile No:</span>{" "}
              {profileDetails?.mobileNo}
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {profileDetails?.dob}
            </p>
            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {profileDetails?.gender}
            </p>
          </div>
          <button
            className="bg-[#428777] text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-blue"
            onClick={handleHasBackend}
          >
            Update Profile
          </button>
        </div>
      ) : (
        <ProfileForm handleToggle={handleToggle} />
      )}
    </div>
  );
}

export default ProfileUpdated;
