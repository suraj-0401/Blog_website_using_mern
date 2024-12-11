import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";

function NavigationSidebar({ onSelectComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track login status
  const [error, setError] = useState(""); // To track error message
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle component selection
  const handleComponentSelection = (componentName) => {
    onSelectComponent(componentName);
    setIsSidebarOpen(false); // Automatically close sidebar on mobile
  };

  // Navigate to Home page
  const handleHomeNavigation = () => {
    navigate("/");
  };

  // Check login status on component mount and update
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!loginStatus); // Update login state based on localStorage
  }, []);

  // Logout handler function
  const logoutHandler = async (e) => {
    e.preventDefault();
    console.log("Logout button clicked"); // Test if the button is clicked

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/logout"
      );
      console.log(data);
      console.log("Logout request sent successfully"); // Check if the request is sent successfully
      toast.success("Logout successfully");
      localStorage.removeItem("isLoggedIn"); // Clear login status
      setIsLoggedIn(false); // Update state to reflect logged out
      navigate("/login"); // Navigate to login page after logout
    } catch (error) {
      console.error(error);
      setError("Error logging out. Please try again."); // Set error message
    }
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <CiMenuBurger className="text-3xl text-gray-800 hover:text-gray-500 transition duration-200" />
      </div>

      {/* Sidebar component */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-gray-900 text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        
        {/* Mobile close button */}
        <div
          className="sm:hidden absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <BiSolidLeftArrowAlt className="text-white hover:text-gray-400 transition duration-200" />
        </div>

        {/* Sidebar content */}
        <div className="p-6">
          <div className="text-center mb-8">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-gray-800 shadow-lg"
              src={profile?.user?.photo?.url || "/default-avatar.png"}
              alt="User Profile"
            />
            <h3 className="text-lg font-semibold text-white">
              {profile?.user?.name || "Guest User"}
            </h3>
          </div>

          {/* Navigation links */}
          <ul className="space-y-6">
            <li>
              <button
                onClick={() => handleComponentSelection("My Blogs")}
                className="w-full py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300"
              >
                My Blogs
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentSelection("Create Blog")}
                className="w-full py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
              >
                Create Blog
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentSelection("My Profile")}
                className="w-full py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition duration-300"
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                onClick={handleHomeNavigation}
                className="w-full py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition duration-300"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="w-full py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Background overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default NavigationSidebar;
