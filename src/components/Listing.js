import React from "react";
import { Link } from "react-router-dom";
import engineOilImage from "../images/engineOil.png";
import brakePadsImage from "../images/brakePads.png";
import ledHeadlightsImage from "../images/ledHeadlights.png";
import carBatteryImage from "../images/carBattery.png";
import suspensionKitImage from "../images/suspensionKit.png";
import airFilterImage from "../images/airFilter.png";
import alloyWheelsImage from "../images/alloyWheels.png";
import sparkPlugsImage from "../images/sparkPlugs.png";

const Listing = () => {
  const listings = [
    {
      id: 1,
      title: "Premium Engine Oil",
      description: "High-performance engine oil for maximum efficiency.",
      price: "50 €",
      image: engineOilImage,
    },
    {
      id: 2,
      title: "Brake Pads",
      description: "Durable brake pads for reliable braking.",
      price: "40 €",
      image: brakePadsImage,
    },
    {
      id: 3,
      title: "LED Headlights",
      description: "Energy-efficient LED headlights for clear vision.",
      price: "70 €",
      image: ledHeadlightsImage,
    },
    {
      id: 4,
      title: "Car Battery",
      description: "Long-lasting car battery for all car models.",
      price: "150 €",
      image: carBatteryImage,
    },
    {
      id: 5,
      title: "Suspension Kit",
      description: "Complete suspension kit for a smooth ride.",
      price: "300 €",
      image: suspensionKitImage,
    },
    {
      id: 6,
      title: "Air Filter",
      description: "High-quality air filter for better engine performance.",
      price: "30 €",
      image: airFilterImage,
    },
    {
      id: 7,
      title: "Alloy Wheels",
      description: "Stylish alloy wheels for a premium look.",
      price: "400 €",
      image: alloyWheelsImage,
    },
    {
      id: 8,
      title: "Spark Plugs",
      description: "Efficient spark plugs for smooth engine start.",
      price: "20 €",
      image: sparkPlugsImage,
    },
  ];

  return (
    <div className="bg-[#F6F6F6] py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Spare Parts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <Link
              to={`/details/${item.id}`}
              key={item.id}
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {item.description}
                </p>
                <p className="mt-2 text-lg font-bold text-gray-900">
                  {item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;
