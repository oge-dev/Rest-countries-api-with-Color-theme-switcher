import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../App.module.css";
import axios from "axios";

const CountryDetails = () => {
  const { numericCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    // Fetch main country data
    axios
      .get("../../data.json") // Make sure this path is correct
      .then((response) => {
        const countryData = response.data.find((c) => c.numericCode === numericCode);
        setCountry(countryData);

        if (countryData && countryData.borders) {
          // Fetch border countries by their codes
          const borderData = countryData.borders.map((borderCode) =>
            response.data.find((c) => c.alpha3Code === borderCode)
          );
          setBorderCountries(borderData);
        }
      })
      .catch((error) => {
        console.error("Error fetching country details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [numericCode]);

  if (loading) {
    return <p>Loading country details...</p>;
  }

  if (!country) {
    return <p>Country not found.</p>;
  }

  return (
    <div>
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} /> back
      </Link>
      <div className={styles.country_details}>
        <img src={country.flags.svg} alt="country flag" />
        <div>
          <h3>{country.name}</h3>
          <div className={styles.details}>
            <p>
              <strong>Native Name</strong>: <span>{country.nativeName}</span>
            </p>
            <p>
              <strong>Population</strong>: <span>{country.population}</span>
            </p>
            <p>
              <strong>Region</strong>: <span>{country.region}</span>
            </p>
            <p>
              <strong>Sub Region</strong>: <span>{country.subregion}</span>
            </p>
            <p>
              <strong>Capital</strong>: <span>{country.capital}</span>
            </p>
            <p>
              <strong>Top Level Domain</strong>: <span>{country.topLevelDomain}</span>
            </p>
            <p>
              <strong>Currencies</strong>: <span>{country.currencies.map((currency) => currency.name).join(", ")}</span>
            </p>
            <p>
              <strong>Languages</strong>: <span>{country.languages.map((language) => language.name).join(", ")}</span>
            </p>
          </div>
          <div>
            <strong>Border Countries</strong>:
            <span>
              {borderCountries.length > 0 ? (
                borderCountries.map((borderCountry) => (
                  <Link 
                    to={`/country/${borderCountry.numericCode}`} // Adjust the path if necessary
                    key={borderCountry.alpha3Code}
                    className={styles.border_link}
                  >
                    <div> {borderCountry.name}</div>
                   
                  </Link>
                ))
              ) : (
                "None"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
