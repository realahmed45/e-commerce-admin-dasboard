import React from "react";
import {
  FaCarBattery,
  FaCogs,
  FaBolt,
  FaRoad,
  FaCarSide,
} from "react-icons/fa";

const HorizontalCards = () => {
  const cards = [
    {
      title: "Engine Parts",
      description: "Premium engine parts for your vehicles.",
      icon: <FaCogs className="text-6xl text-gray-700" />,
      bgColor: "bg-[#FADADD]", // Darker Pink
    },
    {
      title: "Brake Systems",
      description: "Reliable brakes for enhanced safety.",
      icon: <FaCarSide className="text-6xl text-gray-700" />,
      bgColor: "bg-[#B3E5FC]", // Sky Blue
    },
    {
      title: "Lighting & Electrical",
      description: "High-quality lighting and electrical components.",
      icon: <FaBolt className="text-6xl text-gray-700" />,
      bgColor: "bg-[#FFD700]", // Dark Yellow
    },
    {
      title: "Suspension Systems",
      description: "Durable and reliable suspension parts.",
      icon: <FaRoad className="text-6xl text-gray-700" />,
      bgColor: "bg-[#B3E5FC]", // Sky Blue
    },
    {
      title: "Car Batteries",
      description: "Long-lasting car batteries for all models.",
      icon: <FaCarBattery className="text-6xl text-gray-700" />,
      bgColor: "bg-[#FADADD]", // Darker Pink
    },
  ];

  return (
    <div className="bg-[#F6F6F6] py-8">
      <div className="container mx-auto flex overflow-x-auto space-x-4 px-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-[80%] sm:w-[32%] rounded-lg shadow-md overflow-hidden ${card.bgColor}`}
            style={{ height: "170px" }}
          >
            <div className="flex h-full">
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{card.description}</p>
                <p className="mt-4 font-bold text-gray-600 cursor-pointer">
                  Discover the products →
                </p>
              </div>
              <div className="flex items-center justify-center flex-shrink-0 p-4">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
