import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { UserLogout } from "../../Apis/apiHandlers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await UserLogout();
      localStorage.clear();
      dispatch(logout());
      toast.success("Logout successful");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Logout failed:", error.message);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <header
        className="flex justify-between items-center px-4 py-3 bg-[#2c3e50] shadow relative"
        role="banner"
      >
        <button
          id="toggleSidebarBtn"
          onClick={toggleSidebar}
          className="text-white text-xl hover:text-green-400 transition-all duration-200"
          aria-label="Toggle Sidebar"
        >
          <i className="fa-solid fa-bars" aria-hidden="true"></i>
        </button>

        <div className="relative" ref={dropdownRef}>
          <img
            src="src/assets/img/profile.jpg"
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer border-1 border-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white text-black rounded-md shadow-lg z-50 shadow-gray-300 transition-all duration-300 ease-in-out transform border-1 border-white">
              <Link
                to="/userprofile"
                className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
