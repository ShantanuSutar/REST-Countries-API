import React from "react";

const Country = ({ name, population, capital, region, flag }) => {
  return (
    <div className="country">
      <picture>
        <img src={flag} alt="Country Flag" />
      </picture>
      <section>
        <h2>{name}</h2>
        <p>
          <span className="country-info-highlight">Population:</span>
          {population}
        </p>
        <p>
          <span className="country-info-highlight"> Capital: </span>
          {capital}
        </p>
        <p>
          <span className="country-info-highlight">Region: </span>
          {region}
        </p>
      </section>
    </div>
  );
};

export default Country;
