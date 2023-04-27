import React from "react";
import { useParams } from "react-router-dom";
const CountryDetails = ({ countries }) => {
  const params = useParams();

  let name;
  countries.forEach((country) => {
    if (country.name.common === params.countryName) {
      name = country.name.common;
    }
  });
  console.log(name);
  return <div>{name}</div>;
};

export default CountryDetails;
