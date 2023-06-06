import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function StateList() {
    const { continent } = useParams();

    const [state, setState] = useState({
        current_continent: "",
        countries: [],
    });

    useEffect(() => {
        readData();
    }, [continent]);

    const readData = () => {
        setState((prevState) => ({ ...prevState, current_continent: continent }));

        axios
            .get(`http://localhost:3000/api/country/country_name/${continent}`)
            .then((response) => {
                setState((prevState) => ({
                    ...prevState,
                    countries: response.data.data,
                }));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const { current_continent, countries } = state;
    if (!countries) {
        return (
            <div>
                <h1>Continent: {current_continent}</h1>
                <div>No data</div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Continent: {current_continent}</h1>
                <ul className="list-group">
                    {countries.map((country) => (
                        <li className="list-group-item" key={country.name}>
                            <Link to={`/country/${country.name}`}>
                                {country.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
