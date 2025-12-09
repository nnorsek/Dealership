import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return (
    <div className="App">
      <Navbar />
      <div className="homeSection">{children}</div>
    </div>
  );
};

export default App;
