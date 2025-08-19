import React, { useState } from "react";
import {
  FaCamera,
  FaUser,
  FaMapMarkerAlt,
  FaGlobe,
  FaCity,
  FaMailBulk,
  FaEdit,
  FaSave,
  FaUserEdit
} from "react-icons/fa";
import {
  MdLocationOn,
  MdHome,
  MdPublic,
  MdPersonOutline
} from "react-icons/md";
import {
  HiOutlineIdentification,
  HiOutlineLocationMarker,
  HiOutlineMail
} from "react-icons/hi";
import CompleteProfileLinks from "../MainComponents/CompleteProfileLinks";
import bgImage from "../../assets/img/profile.jpg";

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    bio: "",
    profileImage: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const countries = [
    { value: "India", label: "India" },
    { value: "USA", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" }
  ];

  const states = {
    India: ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat"],
    USA: ["California", "New York", "Texas", "Florida", "Illinois"],
    UK: ["England", "Scotland", "Wales", "Northern Ireland"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia"]
  };

  const cities = {
    Delhi: ["New Delhi", "Gurgaon", "Noida", "Faridabad"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    "New York": ["New York City", "Buffalo", "Rochester", "Syracuse"],
    England: ["London", "Manchester", "Birmingham", "Liverpool"]
  };

  return (
    <>
      <CompleteProfileLinks />
      <hr className="mt-3" />
      <div className="min-h-screen py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUserEdit className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Personal Information</h1>
                <p className="text-gray-600">Complete your profile to get started</p>
              </div>
            </div>

            {/* Profile Image Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">


                  <img
                    src={formData.profileImage || bgImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />


                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="profileImageInput"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="profileImageInput"
                  className="absolute bottom-0 right-0 bg-[#2c3e50] hover:bg-[#1a252f] text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors duration-200 group"
                >
                  <FaCamera className="text-sm group-hover:scale-110 transition-transform duration-200" />
                </label>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Photo</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Upload a professional photo that represents you well. JPG, PNG files up to 5MB.
                </p>
                <label
                  htmlFor="profileImageInput"
                  className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  <FaEdit className="text-sm" />
                  <span>Change Photo</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg">
                  <HiOutlineIdentification className="text-green-600 text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="text-gray-400" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <HiOutlineMail className="text-gray-400" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <FaMailBulk className="text-gray-400" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <MdPersonOutline className="text-gray-400" />
                    <span>Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <HiOutlineLocationMarker className="text-purple-600 text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <MdHome className="text-gray-400" />
                    <span>Street Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your street address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaGlobe className="text-gray-400" />
                      <span>Country</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <MdLocationOn className="text-gray-400" />
                      <span>State/Province</span>
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={!formData.country}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select State</option>
                      {formData.country && states[formData.country]?.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaCity className="text-gray-400" />
                      <span>City</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!formData.state}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select City</option>
                      {formData.state && cities[formData.state]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>Postal Code</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Enter postal code"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <MdPublic className="text-orange-600 text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">About You</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself, your interests, experience, or anything you'd like to share..."
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2c3e50] focus:border-[#2c3e50] outline-none transition-colors duration-200 resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {formData.bio.length}/500 characters
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center space-x-2 px-8 py-2 bg-[#2c3e50] hover:bg-[#1a252f] text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
              >
                <FaSave className="text-sm" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
