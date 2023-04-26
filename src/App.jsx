import React, { useState, useEffect } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import "./App.css";
import Country from "./Country";

const url = "https://restcountries.com/v3.1/all";

const App = () => {
  const [countries, setCountries] = useState([]);
  const noCountries = countries.status || countries.message;

  let response = [];
  const fetchData = async () => {
    response = await fetch(url).then((res) => {
      return res.json();
    });

    console.log(response);
    setCountries(response);
  };

  const handleSearch = (e) => {
    let name = e.target.value;
    name = name.replace(/[^A-Za-z]/g, "");
    if (name) {
      const fetchSearch = async () => {
        const fetchData = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const response = await fetchData.json();

        if (response.status !== 404) {
          setCountries(response);
        }
      };

      try {
        fetchSearch();
      } catch (error) {
        console.log(error);
      }
    }
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
      <div className="countries">
        <section className="search-filter">
          <section>
            <AiOutlineSearch />
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search for a country..."
            />
          </section>
        </section>
        <section className="countries-info">
          {!noCountries ? (
            countries.map((country, index) => {
              return (
                <Country
                  key={index}
                  name={country.name.common}
                  capital={country.capital}
                  population={country.population}
                  flag={country.flags.png}
                  region={country.region}
                />
              );
            })
          ) : (
            <p>No Countries Found</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
