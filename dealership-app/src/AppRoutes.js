import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./home/HomePage.js";
import App from "./App.js";
import CarList from "./carlist/CarList.js";
const AppRoutes = () => {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carlist" element={<CarList />} />
        </Routes>
      </App>
    </Router>
  );
};

export default AppRoutes;
