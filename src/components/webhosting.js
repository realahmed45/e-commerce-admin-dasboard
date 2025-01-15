import React, { useState } from "react";

function WebHosting() {
  const [activeTab, setActiveTab] = useState("monthly");
  const plans = {
    monthly: [
      {
        title: "Bronze Plan",
        price: "750/month",
        features: [
          "500 MB Space",
          "2 FTP",
          "2 Sub Domains",
          "15 GB Bandwidth",
          "2 Databases",
        ],
        borderColor: "#D4AF37", // Light brown
        buttonColor: "#D4AF37",
      },
      {
        title: "Gold Plan",
        price: "1,275/month",
        features: [
          "1024 MB Space",
          "5 FTP",
          "5 Sub Domains",
          "25 GB Bandwidth",
          "4 Databases",
        ],
        borderColor: "#FFD700", // Light yellow
        buttonColor: "#FFD700",
      },
      {
        title: "Diamond Plan",
        price: "2,025/month",
        features: [
          "2048 MB Space",
          "10 FTP",
          "10 Sub Domains",
          "35 GB Bandwidth",
          "8 Databases",
        ],
        borderColor: "#ADD8E6", // Light blue
        buttonColor: "#ADD8E6",
      },
      {
        title: "Crystal Plan",
        price: "2,700/month",
        features: [
          "4096 MB Space",
          "15 FTP",
          "15 Sub Domains",
          "50 GB Bandwidth",
          "10 Databases",
        ],
        borderColor: "#E6E6FA", // Very light purple
        buttonColor: "#E6E6FA",
      },
    ],
    yearly: [
      {
        title: "Bronze Plan",
        price: "8,000/year",
        features: [
          "500 MB Space",
          "2 FTP",
          "2 Sub Domains",
          "15 GB Bandwidth",
          "2 Databases",
        ],
        borderColor: "#D4AF37", // Light brown
        buttonColor: "#D4AF37",
      },
      {
        title: "Gold Plan",
        price: "13,500/year",
        features: [
          "1024 MB Space",
          "5 FTP",
          "5 Sub Domains",
          "25 GB Bandwidth",
          "4 Databases",
        ],
        borderColor: "#FFD700", // Light yellow
        buttonColor: "#FFD700",
      },
      {
        title: "Diamond Plan",
        price: "20,750/year",
        features: [
          "2048 MB Space",
          "10 FTP",
          "10 Sub Domains",
          "35 GB Bandwidth",
          "8 Databases",
        ],
        borderColor: "#ADD8E6", // Light blue
        buttonColor: "#ADD8E6",
      },
      {
        title: "Crystal Plan",
        price: "27,500/year",
        features: [
          "4096 MB Space",
          "15 FTP",
          "15 Sub Domains",
          "50 GB Bandwidth",
          "10 Databases",
        ],
        borderColor: "#E6E6FA", // Very light purple
        buttonColor: "#E6E6FA",
      },
    ],
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Web Hosting
        </h2>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`text-lg font-medium pb-2 ${
              activeTab === "monthly" ? "border-b-2 border-blue-600" : ""
            }`}
            onClick={() => setActiveTab("monthly")}
          >
            Monthly
          </button>
          <button
            className={`text-lg font-medium pb-2 ${
              activeTab === "yearly" ? "border-b-2 border-blue-600" : ""
            }`}
            onClick={() => setActiveTab("yearly")}
          >
            Yearly
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans[activeTab].map((plan, index) => (
            <div
              key={index}
              className="relative rounded-lg shadow-md bg-white p-6"
              style={{
                borderTop: `4px solid ${plan.borderColor}`,
                borderBottom: `4px solid ${plan.borderColor}`,
              }}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {plan.title}
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">{`PKR ${plan.price}`}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <button
                className="mt-6 w-full py-2 text-white rounded-md"
                style={{
                  backgroundColor: plan.buttonColor,
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WebHosting;
