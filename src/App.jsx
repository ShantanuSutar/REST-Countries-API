import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import "./App.css";
import Country from "./Country";
import CountryDetails from "./CountryDetails";

const url = "https://restcountries.com/v3.1/all";

const App = () => {
  const [countries, setCountries] = useState([]);
  const noCountries = countries.status || countries.message;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showDetails = (code) => {
    navigate(`/${code}`);
  };

  let response = [];
  const fetchData = async () => {
    setLoading(true);
    response = await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then(setLoading(false));
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

  const handleRegion = (e) => {
    setLoading(true);
    const region = e.target.value;
    console.log(region);
    if (region !== "All") {
      const fetchSearch = async () => {
        const fetchData = await fetch(
          `https://restcountries.com/v3.1/region/${region}`
        );
        const response = await fetchData.json().then(setLoading(false));

        if (response.status !== 404) {
          setCountries(response);
        }
      };

      try {
        fetchSearch();
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchData();
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
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <div className="loading">Loading . . .</div>
            ) : (
              <>
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
                    <form action="/">
                      <select name="region" id="region" onChange={handleRegion}>
                        <option disabled selected value>
                          Region
                        </option>
                        <option value="All">All</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="America">America</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                      </select>
                    </form>
                  </section>
                  <section className="countries-info">
                    {!noCountries ? (
                      countries.map((country, index) => {
                        return (
                          <Country
                            key={index}
                            code={country.name.common}
                            name={country.name.common}
                            capital={country.capital}
                            population={country.population}
                            flag={country.flags.png}
                            region={country.region}
                            showDetails={showDetails}
                          />
                        );
                      })
                    ) : (
                      <p>No Countries Found</p>
                    )}
                  </section>
                </div>
              </>
            )
          }
        ></Route>
        <Route
          path="/:countryName"
          element={<CountryDetails countries={countries} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
