import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const CountryDetails = ({ countries, dark }) => {
  const navigate = useNavigate();
  const params = useParams();
  let name;
  let flagImg;
  let nativeName;
  let population;
  let region;
  let subregion;
  let capital;
  let topLevelDomain;
  let official;
  let currencies = {};
  let languages = [];
  let borders = [];

  countries.forEach((country) => {
    if (country.name.common === params.countryName) {
      name = country.name.common;
      flagImg = country.flags.png;
      nativeName = "";
      population = country.population;
      region = country.region;
      subregion = country.subregion;
      capital = country.capital;
      official = country.name.official;
      topLevelDomain = country.topLevelDomain;
      currencies = country.currencies;
      // Converting object into array
      currencies = Object.values(currencies);

      //   currencies.forEach((currency) => {
      //     console.log(currency.name);
      //   });

      languages = country.languages;
      // Converting object into array
      languages = Object.values(languages);

      if (country.borders) {
        borders = country.borders;
        // Converting object into array
        borders = Object.values(borders);
      }
    }
  });

  return (
    <div className="country-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <BsArrowLeft />
        Back
      </button>
      <div className="country-details-body">
        <div className="img-container">
          <img src={flagImg} alt="Country Flag" />
        </div>
        <div className="country-details-content">
          <div className="country-details-name">
            <h1>{name}</h1>
          </div>
          <div className="country-details-info">
            <section>
              {/* <p>
                Native Name: <span>{nativeName}</span>
              </p> */}
              <p>
                Official Name: <span>{official}</span>
              </p>
              <p>
                Population: <span>{population}</span>
              </p>
              <p>
                Region: <span>{region}</span>
              </p>
              <p>
                Sub Region: <span>{subregion}</span>
              </p>
              <p>
                Capital: <span>{capital}</span>
              </p>
            </section>
            <section>
              {/* <p>
                Top Level Domain : <span>{topLevelDomain}</span>
              </p> */}
              <p>
                Currencies:{" "}
                <span>
                  {currencies.map((currency) => currency.name + "     ")}
                </span>
              </p>
              <p>
                Languages:{" "}
                <span>{languages.map((language) => language + "     ")}</span>
              </p>
            </section>
          </div>
          <div>
            <p>
              Borders:
              {borders.map((border) => (
                <span>{border}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
