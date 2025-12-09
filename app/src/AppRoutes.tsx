import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import CarList from "./pages/CarList";
import CreateCar from "./components/CreateCar";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carlist" element={<CarList />} />
          <Route path="/admin/create-car" element={<CreateCar />} />
        </Routes>
      </App>
    </Router>
  );
};

export default AppRoutes;
