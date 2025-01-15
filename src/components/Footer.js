import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaGoogle,
} from "react-icons/fa";
import logo from "../images/logo.png";

function Footer() {
  return (
    <footer className="bg-blue-50 py-12">
      <div className="container mx-auto px-6">
        {/* Description */}
        <div className="text-left text-gray-700 mb-8 text-sm leading-6">
          <p>
            Welcome to Sky Cloud Services, your trusted partner for secure and
            efficient cloud solutions. Our comprehensive platform covers
            Software as a Service (SaaS), Platform as a Service (PaaS), and
            Infrastructure as a Service (IaaS) across major cities in Pakistan,
            such as Islamabad, Lahore, and Karachi. We also serve prominent
            locations in the EU, including London, Paris, and Berlin, as well as
            key cities in the Middle East like Dubai, Abu Dhabi, and Riyadh, and
            major Asian cities like Singapore, Tokyo, and Mumbai. With robust
            security measures, including real-time monitoring and compliance, we
            prioritize the safety of your data. Choose from shared hosting,
            dedicated servers, or cloud hosting solutions with our reliable
            infrastructure.
          </p>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-800">Sky Cloud</h3>
            {/* Add your logo in the div below */}
            <div className="mt-2">
              <img src={logo} alt="SkyCloud Logo" className="h-20" />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left mb-8">
          <div>
            <h3 className="font-bold text-gray-700 mb-4 text-sm">
              QUICK LINKS
            </h3>
            <ul className="space-y-2 text-xs text-gray-700">
              <li>IAAS</li>
              <li>Security Services</li>
              <li>VAS</li>
              <li>Hosting Services</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4 text-sm">HELP</h3>
            <ul className="space-y-2 text-xs text-gray-700">
              <li>About Us</li>
              <li>Support</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4 text-sm">
              SOCIAL MEDIA
            </h3>
            <div className="flex justify-center sm:justify-start space-x-4 text-gray-700">
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
              <FaYoutube />
              <FaInstagram />
              <FaGoogle />
            </div>
          </div>
        </div>

        {/* Rights */}
        <div className="text-center">
          <p className="text-xs text-gray-700">
            © All Rights Reserved 2025. Sky Cloud
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
