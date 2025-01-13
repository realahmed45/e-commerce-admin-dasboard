import React from "react";
import { useParams } from "react-router-dom";
import engineOilImage from "../images/engineOil.png";
import brakePadsImage from "../images/brakePads.png";
import ledHeadlightsImage from "../images/ledHeadlights.png";
import carBatteryImage from "../images/carBattery.png";
import suspensionKitImage from "../images/suspensionKit.png";
import airFilterImage from "../images/airFilter.png";
import alloyWheelsImage from "../images/alloyWheels.png";
import sparkPlugsImage from "../images/sparkPlugs.png";

const Details = () => {
  const { id } = useParams();

  const items = [
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

  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{item.description}</p>
          <p className="text-2xl font-bold text-gray-900 mb-4">{item.price}</p>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition">
              Buy
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition">
              Make an Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
