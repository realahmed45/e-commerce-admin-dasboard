import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./componenets/Login";
import Sidebar from "./componenets/sidebar";
import AllOrders from "./componenets/allOrders";
import AddProduct from "./componenets/addProducts";
import AllEmployees from "./componenets/allEmployees";
import AddEmployee from "./componenets/addEmployee";
import EditEmployees from "./componenets/EditEmployees";
import HomePage from "./componenets/home";
import { Home } from "lucide-react";

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
        <Route
          path="/all-employees"
          element={
            <>
              <AllEmployees />
            </>
          }
        />
        <Route
          path="/admin/employee/edit"
          element={
            <>
              <EditEmployees />
            </>
          }
        />

        <Route
          path="/admin/employee/add"
          element={
            <>
              <AddEmployee />
            </>
          }
        />

        <Route
          path="/home"
          element={
            <>
              <HomePage />
            </>
          }
        />
      </Routes>

      {/* Footer */}
    </Router>
  );
}

export default App;
