import React from "react";
import { FaServer, FaShieldAlt, FaPuzzlePiece, FaCloud } from "react-icons/fa";

function OtherServices() {
  const services = [
    {
      title: "Storage as a Service",
      icon: <FaCloud className="text-5xl text-gray-800 mb-4" />,
      features: [
        "Public and Private Data Sharing",
        "Data Synchronization",
        "Two Step Authentication",
        "File Drop",
        "Email Platform Integration",
      ],
    },
    {
      title: "Dedicated Web Hosting",
      icon: <FaServer className="text-5xl text-gray-800 mb-4" />,
      features: [
        "cPanel based Hosting",
        "Seamless Migration of Website",
        "Let's encrypt SSL Certificate",
        "Cloudflare Free Plan",
        "DNS Hosting",
      ],
    },
    {
      title: "Antispam Solution",
      icon: <FaPuzzlePiece className="text-5xl text-gray-800 mb-4" />,
      features: [
        "Content Filtration",
        "Sender Reputation Authentication",
        "Behavior Analysis",
        "Threat Analysis & Blockage",
        "Suspected URL Blocking",
      ],
    },
    {
      title: "VPN as a Service",
      icon: <FaShieldAlt className="text-5xl text-gray-800 mb-4" />,
      features: [
        "Secure Connection",
        "Secure Data Transfer",
        "Easy to Configure",
        "Data Encryption",
        "Reduce Security Threat",
      ],
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Other Services
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-12 lg:grid-cols-4 gap-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 p-6 border border-gray-100"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 text-center mt-4">
                {service.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full text-blue-800 py-2 border border-blue-800 rounded-md">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Proceed Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-700">
            Proceed to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default OtherServices;
