import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App({ children }) {
  return (
    <div className="App">
      <Navbar />
      <div className="homeSection">{children}</div>
    </div>
  );
}

export default App;
