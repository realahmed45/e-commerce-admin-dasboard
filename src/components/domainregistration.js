import React from "react";
import Navbar from "./Nabar";
import HeroSection from "./HeroSection";
import Footer from "./Footer";

function DomainRegistration() {
  return (
    <>
      <section className="bg-blue-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            Choose the perfect solution for your business
          </h1>
          <p className="text-center text-orange-400 mt-4">
            For Web Hosting and Nmail solutions, register your new domain or
            enter your existing domain
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center mt-6">
            <input
              type="text"
              placeholder="Enter Your Domain"
              className="w-full md:w-2/3 lg:w-1/2 bg-white text-black rounded-l-md p-3 focus:outline-none"
            />
            <select className="bg-gray-200 text-black p-3 rounded-r-none">
              <option value=".pk">.pk</option>
              <option value=".com">.com</option>
              <option value=".net">.net</option>
              <option value=".org">.org</option>
              <option value=".edu.pk">.edu.pk</option>
            </select>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md">
              Search
            </button>
          </div>
          <p className="text-center text-lg mt-8">
            Reliable & Secure Hosting Services
          </p>
          <p className="text-center text-lg text-orange-400">
            .COM | .NET | .ORG | .PK | .COM.PK | .EDU.PK
          </p>
        </div>
      </section>
    </>
  );
}

export default DomainRegistration;
