import React from "react";
import {
  FaUser,
  FaRegCommentDots,
  FaRegHeart,
  FaTruck,
  FaShieldAlt,
  FaSyncAlt,
  FaSearch,
  FaPlus,
  FaTools,
  FaCarAlt,
  FaWrench,
  FaCarBattery,
} from "react-icons/fa";
import image1 from "../images/image1.png";
import bannerImage from "../images/banner.png";

const Navbar = () => {
  return (
    <header className="bg-white border-b">
      {/* Top Section */}
      <div className="bg-[#224957] text-white text-sm py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex justify-between w-full">
            {/* Secure Payment */}
            <span className="flex items-center">
              <img
                src={image1}
                alt="Secure payment"
                className="h-5 w-5 mr-2 hidden sm:flex"
              />
              Secure payment
            </span>
            {/* Integrated Delivery */}
            <span className="flex items-center">
              <FaTruck className="h-5 w-5 mr-2 hidden sm:flex" />
              Integrated delivery
            </span>
            {/* Purchase Protection */}
            <span className="flex items-center">
              <FaShieldAlt className="h-5 w-5 mr-2 hidden sm:flex" />
              Purchase Protection
            </span>
            {/* Satisfied or Refunded */}
            <span className="flex items-center hidden sm:flex">
              <FaSyncAlt className="h-5 w-5 mr-2" />
              Satisfied or refunded
            </span>
            {/* Flag */}
            <div className="flex items-center">
              <img
                src="https://flagcdn.com/w40/fr.png"
                alt="French Flag"
                className="h-5 w-5 mr-2"
              />
              <span className="text-white">▼</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="flex items-center ">
          <div className="bg-green-500 text-white font-bold text-2xl px-4 py-2 rounded hidden sm:block">
            everide
          </div>
        </div>

        {/* Search Bar - Increased Width for Smaller Screens */}
        <div className="w-full sm:flex-grow mx-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for parts, accessories..."
              className="bg-transparent flex-grow px-2 py-1 outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Icons Section - Hidden for Smaller Screens */}
        <div className="hidden sm:flex items-center space-x-6 text-gray-700">
          <div className="flex flex-col items-center cursor-pointer">
            <FaUser className="text-xl" />
            <span className="text-sm">Account</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <FaRegCommentDots className="text-xl" />
            <span className="text-sm">Messages</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <FaRegHeart className="text-xl" />
            <span className="text-sm">Favorites</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <nav className="bg-white border-t hidden sm:block">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          {/* Navigation Links */}
          <ul className="flex space-x-6 font-bold text-sm items-center">
            <li className="text-gray-800 cursor-pointer">Engine Parts</li>
            <li className="text-gray-800 cursor-pointer">Brake Systems</li>
            <li className="text-gray-800 cursor-pointer">
              Lighting & Electrical
            </li>
            <li className="text-gray-800 cursor-pointer">Body Parts</li>
            <li className="text-gray-800 cursor-pointer">Accessories</li>
          </ul>

          {/* Sell Button */}
          <button className="bg-green-500 text-white px-14 py-3 rounded font-semibold hidden sm:block">
            Sell
          </button>
        </div>

        {/* Subcategories Section */}
        <div className="bg-[#E6F4F6] py-2">
          <div className="container mx-auto flex justify-center font-semibold space-x-8 text-sm text-gray-800">
            <span className="cursor-pointer">Used Parts</span>
            <span className="cursor-pointer">New Accessories</span>
            <span className="cursor-pointer">Suspension</span>
            <span className="cursor-pointer">Wheels & Tires</span>
            <span className="cursor-pointer">Exhaust Systems</span>
            <span className="cursor-pointer">Tools & Equipment</span>
          </div>
        </div>
      </nav>

      {/* Subcategories Section for Smaller Screens */}
      <div className="bg-[#E6F4F6] py-2 sm:hidden">
        <div className="container mx-auto flex justify-between items-center space-x-4 px-4">
          <div className="flex flex-col items-center cursor-pointer">
            <FaTools className="text-xl" />
            <span className="text-sm">Tools</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <FaCarAlt className="text-xl" />
            <span className="text-sm">Body Parts</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <FaWrench className="text-xl" />
            <span className="text-sm">Suspension</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <FaCarBattery className="text-xl" />
            <span className="text-sm">Batteries</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Small Screens */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-2 sm:hidden">
        <div className="flex flex-col items-center cursor-pointer">
          <FaUser className="text-xl" />
          <span className="text-sm">Account</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FaSearch className="text-xl" />
          <span className="text-sm">Search</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="bg-green-500 p-4 rounded-full">
            <FaPlus className="text-xl text-white" />
          </div>
          <span className="text-sm">Sell</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FaRegCommentDots className="text-xl" />
          <span className="text-sm">Messages</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FaRegHeart className="text-xl" />
          <span className="text-sm">Favorites</span>
        </div>
      </div>

      {/* Banner for Larger Screens */}
      <div className="hidden sm:block mt-4">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full object-cover h-60"
        />
      </div>
    </header>
  );
};

export default Navbar;
