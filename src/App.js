import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nabar";
import HeroSection from "./components/HeroSection";
import WhySkyCloud from "./components/whysky";
import SkyCloudTable from "./components/skytable";
import VASPackages from "./components/Vas";
import OtherServices from "./components/otherservices";
import Footer from "./components/Footer";
import DomainRegistration from "./components/domainregistration";
import WebHosting from "./components/webhosting";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Hero Section Route */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />

              {/* Why SkyCloud Section */}
              <section id="whycloud">
                <WhySkyCloud />
              </section>

              {/* SkyCloud Table Section */}
              <SkyCloudTable />

              {/* VAS Packages Section */}
              <section id="iaas">
                <VASPackages />
              </section>

              {/* Other Services Section */}
              <section id="otherservices">
                <OtherServices />
              </section>
            </>
          }
        />

        {/* Domain Registration Route */}
        <Route path="/domain-registration" element={<DomainRegistration />} />
        <Route path="/web-hosting" element={<WebHosting />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
