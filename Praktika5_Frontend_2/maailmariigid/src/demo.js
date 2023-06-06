import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const { continent } = useParams();

  useEffect(() => {
    if (continent) {
      axios
        .get(`http://localhost:8010/api/continent/${continent}/countries`)
        .then((response) => {
          setCountries(response.data.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [continent]);

  if (!continent) {
    return null;
  }

  return (
    <div>
      <h2>Countries of {continent}</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>
            <Link to={`/country/${country.code}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
