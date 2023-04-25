import React from "react";
import { MdOutlineLightMode } from "react-icons/md";
import "./App.css";
const App = () => {
  return (
    <div className="container">
      <header>
        <h1>Where in the world?</h1>
        <button className="toggle">
          <MdOutlineLightMode />
          Light
        </button>
      </header>
    </div>
  );
};

export default App;
