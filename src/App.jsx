import React, { useState, useEffect } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import "./App.css";
import Country from "./Country";

const url = "https://restcountries.com/v3.1/all";

const App = () => {
  const [countries, setCountries] = useState([]);

  let response = [];
  const fetchData = async () => {
    response = await fetch(url).then((res) => {
      return res.json();
    });

    console.log(response);
    setCountries(response);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Where in the world?</h1>
        <button className="toggle">
          <MdOutlineLightMode />
          Light
        </button>
      </header>
      <Country />
    </div>
  );
};

export default App;
