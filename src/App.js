import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HorizontalCards from "./components/cards";
import Listing from "./components/Listing";
import Details from "./components/listingdetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page: HorizontalCards and Listings */}
        <Route
          path="/"
          element={
            <>
              <HorizontalCards />
              <Listing />
            </>
          }
        />

        {/* Details Page */}
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
