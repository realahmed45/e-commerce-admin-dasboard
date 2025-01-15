import React, { useState } from "react";
import fullWidthImage from "../images/banner1.png";

function VASPackages() {
  const bestSellingPackages = [
    {
      title: "SM.Value",
      price: "15,100",
      details: [
        "4 CPU",
        "8 GB RAM",
        "40 GB HDD",
        "1 Floating IP",
        "2 VMs",
        "10/100 Bandwidth",
      ],
      isHotSelling: true,
    },
    {
      title: "SM.xSmall",
      price: "5,800",
      details: [
        "2 CPU",
        "2 GB RAM",
        "20 GB HDD",
        "1 Floating IP",
        "1 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "SM.Small",
      price: "10,900",
      details: [
        "4 CPU",
        "4 GB RAM",
        "40 GB HDD",
        "1 Floating IP",
        "2 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "SM.Medium",
      price: "18,000",
      details: [
        "8 CPU",
        "8 GB RAM",
        "40 GB HDD",
        "1 Floating IP",
        "2 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "SM.Large",
      price: "36,000",
      details: [
        "16 CPU",
        "16 GB RAM",
        "80 GB HDD",
        "2 Floating IPs",
        "4 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "SM.xLarge",
      price: "65,900",
      details: [
        "32 CPU",
        "32 GB RAM",
        "80 GB HDD",
        "2 Floating IPs",
        "4 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "SM.Huge",
      price: "126,100",
      details: [
        "64 CPU",
        "64 GB RAM",
        "160 GB HDD",
        "2 Floating IPs",
        "8 VMs",
        "10/100 Bandwidth",
      ],
    },
  ];

  const ramIntensivePackages = [
    {
      title: "RI.xSmall",
      price: "6,900",
      details: [
        "1 CPU",
        "4 GB RAM",
        "20 GB HDD",
        "1 Floating IP",
        "1 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "RI.Small",
      price: "12,000",
      details: [
        "2 CPU",
        "8 GB RAM",
        "20 GB HDD",
        "1 Floating IP",
        "1 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "RI.Medium",
      price: "22,700",
      details: [
        "4 CPU",
        "16 GB RAM",
        "40 GB HDD",
        "1 Floating IP",
        "2 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "RI.Large",
      price: "42,300",
      details: [
        "8 CPU",
        "32 GB RAM",
        "40 GB HDD",
        "1 Floating IP",
        "2 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "RI.xLarge",
      price: "84,600",
      details: [
        "16 CPU",
        "64 GB RAM",
        "80 GB HDD",
        "2 Floating IPs",
        "4 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "RI.Huge",
      price: "162,000",
      details: [
        "32 CPU",
        "128 GB RAM",
        "160 GB HDD",
        "2 Floating IPs",
        "8 VMs",
        "10/100 Bandwidth",
      ],
    },
  ];

  const cpuIntensivePackages = [
    {
      title: "CI.xSmall",
      price: "4,600",
      details: [
        "2 CPU",
        "1 GB RAM",
        "20 GB HDD",
        "1 Floating IP",
        "1 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "CI.Small",
      price: "7,500",
      details: [
        "4 CPU",
        "2 GB RAM",
        "20 GB HDD",
        "1 Floating IP",
        "1 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "CI.Medium",
      price: "14,400",
      details: [
        "8 CPU",
        "8 GB RAM",
        "40 GB HDD",
        "1 Floating IP",
        "2 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "CI.Large",
      price: "28,000",
      details: [
        "16 CPU",
        "8 GB RAM",
        "80 GB HDD",
        "2 Floating IPs",
        "4 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "CI.xLarge",
      price: "49,700",
      details: [
        "32 CPU",
        "16 GB RAM",
        "80 GB HDD",
        "2 Floating IPs",
        "4 VMs",
        "10/100 Bandwidth",
      ],
    },
    {
      title: "CI.Huge",
      price: "94,800",
      details: [
        "64 CPU",
        "64 GB RAM",
        "160 GB HDD",
        "2 Floating IPs",
        "8 VMs",
        "10/100 Bandwidth",
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState("best");

  const renderPackages = (packages) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 mx-[40px]">
      {packages.map((pkg, index) => (
        <div
          key={index}
          className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 p-6"
        >
          {pkg.isHotSelling && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
              Hot Selling
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-800">{pkg.title}</h3>
          <p className="text-2xl font-bold text-gray-800">
            PKR {pkg.price}
            <span className="text-sm font-medium">/month</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {pkg.details.map((detail, i) => (
              <li key={i} className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> {detail}
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full text-blue-800 py-1 border border-blue-800 rounded-md">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Build Your Machine
        </h2>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
          <button
            className={`w-full sm:w-auto px-4 py-2 font-medium text-center rounded-full ${
              activeTab === "best"
                ? "bg-blue-900 text-white"
                : "bg-transparent  text-blue-900"
            }`}
            onClick={() => setActiveTab("best")}
          >
            Best Selling Packages
          </button>
          <button
            className={`w-full sm:w-auto px-4 py-2 font-medium text-center rounded-full ${
              activeTab === "ram"
                ? "bg-blue-900 text-white"
                : "bg-transparent text-blue-900"
            }`}
            onClick={() => setActiveTab("ram")}
          >
            RAM Intensive Packages
          </button>
          <button
            className={`w-full sm:w-auto px-4 py-2 font-medium text-center rounded-full ${
              activeTab === "cpu"
                ? "bg-blue-900 text-white"
                : "bg-transparent  text-blue-900"
            }`}
            onClick={() => setActiveTab("cpu")}
          >
            CPU Intensive Packages
          </button>
        </div>

        {/* Package Display */}
        {activeTab === "best" && renderPackages(bestSellingPackages)}
        {activeTab === "ram" && renderPackages(ramIntensivePackages)}
        {activeTab === "cpu" && renderPackages(cpuIntensivePackages)}

        {/* View All Packages */}
        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700">
            View All Packages
          </button>
        </div>
      </div>

      {/* Full-Width Image */}
      <div className="mt-28">
        <img src={fullWidthImage} alt="Full Width" className="w-full h-200" />
      </div>
    </section>
  );
}

export default VASPackages;
