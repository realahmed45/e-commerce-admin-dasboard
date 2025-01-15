import React, { useState, useEffect } from "react";
import image from "../images/mainimage.png"; // Importing the image

function HeroSection() {
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    "Locally hosted servers",
    "Up to 100 Mbps bandwidth",
    "Unlimited data volume",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prevLine) => (prevLine + 1) % lines.length);
    }, 3000); // 3 seconds for each line
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <section className="bg-white h-screen flex flex-col items-center md:flex-row px-4 md:px-6">
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left mt-[35px] md:mt-0 md:ml-28 order-1 md:order-none">
        <h1 className="text-3xl md:text-6xl font-semibold text-gray-500 leading-snug">
          Empower business
          <br /> growth with
          <br />
          <span className="text-blue-600">SkyCloud</span> solutions
        </h1>
        <p className="text-gray-600 mt-4 text-sm md:text-lg">
          {lines[currentLine]}
        </p>
        <div className="mt-4 flex justify-center md:justify-start space-x-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 md:px-6 md:py-3 rounded-md font-medium text-sm md:text-lg">
            Get Started
          </button>
          <button className="border border-gray-300 px-5 py-2 md:px-6 md:py-3 rounded-md font-medium text-sm md:text-lg hover:bg-gray-100">
            Contact Sales →
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex justify-center mt-4 md:mt-0 order-2">
        <img
          src={image}
          alt="SkyCloud"
          className="w-[250px] h-[200px] md:w-[400px] md:h-[350px] rounded-lg"
        />
      </div>
    </section>
  );
}

export default HeroSection;
