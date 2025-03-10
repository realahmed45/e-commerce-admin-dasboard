import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./componenets/Login";
import Sidebar from "./componenets/sidebar";
import AllOrders from "./componenets/allOrders";
import AddProduct from "./componenets/addProducts";

function App() {
  return (
    <Router>
      <Routes>
        {/* Hero Section Route */}
        <Route
          path="/"
          element={
            <>
              <AdminLogin />
            </>
          }
        />
        <Route
          path="/all-orders"
          element={
            <>
              <AllOrders />
            </>
          }
        />
        <Route
          path="/add-product"
          element={
            <>
              <AddProduct />
            </>
          }
        />
      </Routes>

      {/* Footer */}
    </Router>
  );
}

export default App;
