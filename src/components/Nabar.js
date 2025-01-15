import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHostingOptions, setShowHostingOptions] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path, sectionId) => {
    navigate(path);
    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* Top Banner (Hidden for smaller screens) */}
      <div className="bg-[#4365A1] text-white text-sm py-1 hidden md:block">
        <div className="container mx-auto flex justify-between items-center px-6 h-7">
          <p className="mr-auto ml-2 md:ml-36">
            Strengthen your apps with SkyCloud's new security services,
            shielding against emerging risks.{" "}
            <ScrollLink
              to="learn-more"
              smooth={true}
              duration={500}
              className="underline hover:text-orange-400 cursor-pointer"
            >
              Learn more
            </ScrollLink>
          </p>
          <div className="ml-auto space-x-4">
            <ScrollLink
              to="about-us"
              smooth={true}
              duration={500}
              className="hover:text-orange-400 cursor-pointer"
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="support"
              smooth={true}
              duration={500}
              className="hover:text-orange-400 cursor-pointer"
            >
              Support
            </ScrollLink>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#eef2f3] shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-3 mr-10">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="SkyCloud Logo"
                className="h-10 cursor-pointer"
              />
            </Link>
          </div>

          {/* Hamburger Menu (Small Screens) */}
          <button
            className="md:hidden text-[#2B2E4A]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Links (Desktop) */}
          <ul className="hidden md:flex items-center justify-start space-x-6 font-medium text-[#2B2E4A] mr-56">
            <li>
              <button
                onClick={() => handleNavigation("/", "whycloud")}
                className="hover:text-blue-600 cursor-pointer"
              >
                Why SkyCloud
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/", "iaas")}
                className="hover:text-blue-600 cursor-pointer"
              >
                IAAS
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/", "otherservices")}
                className="hover:text-blue-600 cursor-pointer"
              >
                VAS
              </button>
            </li>
            <li className="relative">
              <button
                onClick={() => setShowHostingOptions(!showHostingOptions)}
                className="hover:text-blue-600 cursor-pointer"
              >
                Hosting Services
              </button>
              {showHostingOptions && (
                <ul className="absolute left-0 bg-white shadow-md border border-gray-200 rounded-md mt-2 w-40">
                  <li className="hover:bg-gray-100">
                    <Link
                      to="/domain-registration"
                      className="block px-4 py-2 text-sm text-[#2B2E4A]"
                    >
                      Domain Registration
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100">
                    <Link
                      to="/web-hosting"
                      className="block px-4 py-2 text-sm text-[#2B2E4A]"
                    >
                      Web Hosting
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <ScrollLink
                to="security-services"
                smooth={true}
                duration={500}
                className="hover:text-blue-600 cursor-pointer"
              >
                Security Services
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="cubes"
                smooth={true}
                duration={500}
                className="hover:text-blue-600 cursor-pointer"
              >
                Cubes
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="tunnelink"
                smooth={true}
                duration={500}
                className="hover:text-blue-600 cursor-pointer"
              >
                Tunnelink
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="twinstor"
                smooth={true}
                duration={500}
                className="hover:text-blue-600 cursor-pointer"
              >
                Twinstor
              </ScrollLink>
            </li>
            <li>
              <div className="hidden md:flex items-center space-x-4 ml-aouto">
                <button className="font-medium text-[#2B2E4A] hover:text-blue-600">
                  Log in
                </button>
                <button className="text-orange-500 hover:text-orange-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h18l-2 13H5L3 3z"
                    />
                    <circle cx="9" cy="19" r="1.5" />
                    <circle cx="15" cy="19" r="1.5" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>

        {/* Sidebar Menu (Mobile) */}
        {isMenuOpen && (
          <ul className="md:hidden bg-[#eef2f3] p-4 space-y-4 font-medium text-[#2B2E4A]">
            <li>
              <button
                onClick={() => handleNavigation("/", "whycloud")}
                className="hover:text-blue-600 cursor-pointer"
              >
                Why SkyCloud
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/", "iaas")}
                className="hover:text-blue-600 cursor-pointer"
              >
                IAAS
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/", "otherservices")}
                className="hover:text-blue-600 cursor-pointer"
              >
                VAS
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowHostingOptions(!showHostingOptions)}
                className="hover:text-blue-600 cursor-pointer"
              >
                Hosting Services
              </button>
              {showHostingOptions && (
                <ul className="bg-white shadow-md border border-gray-200 rounded-md">
                  <li className="hover:bg-gray-100">
                    <Link
                      to="/domain-registration"
                      className="block px-4 py-2 text-sm text-[#2B2E4A]"
                    >
                      Domain Registration
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100">
                    <Link
                      to="/web-hosting"
                      className="block px-4 py-2 text-sm text-[#2B2E4A]"
                    >
                      Web Hosting
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <ScrollLink
                to="security-services"
                smooth={true}
                duration={500}
                className="hover:text-blue-600 cursor-pointer"
              >
                Security Services
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="cubes"
                smooth={true}
                duration={500}
                className="hover:text-blue-600 cursor-pointer"
              >
                Cubes
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="tunnelink"
                smooth={true}
                duration={500}
                className="hover:text-blue-600 cursor-pointer"
              >
                Tunnelink
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="twinstor"
                smooth={true}
                duration={500}
                className="hover:text-blue-600 cursor-pointer"
              >
                Twinstor
              </ScrollLink>
            </li>
            <li>
              <button className="font-medium text-[#2B2E4A] hover:text-blue-600">
                Log in
              </button>
            </li>
            <li>
              <button className="text-orange-500 hover:text-orange-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h18l-2 13H5L3 3z"
                  />
                  <circle cx="9" cy="19" r="1.5" />
                  <circle cx="15" cy="19" r="1.5" />
                </svg>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navbar;
