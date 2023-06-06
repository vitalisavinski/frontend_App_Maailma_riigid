import React, { useState, useEffect } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";


export default function State_info() {
  
    const { country } = useParams();
  
  
    const [state_info, setState_Info] = useState({
      current_country: "",
      country_info: [],
    });
  
  
    useEffect(() => {
      readData();
    }, [country]);
  
   
    const readData = () => {
      setState_Info((prevState) => ({ ...prevState, current_country: country }));
  
      axios
        .get(`http://localhost:3000/api/country/current_country_name/${country}`)
        .then((response) => {
          setState_Info((prevState) => ({
            ...prevState,
            country_info: response.data.data,
          }));
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    
    let vitali = "vitali";
    console.log(vitali);

    const { current_country, country_info } = state_info;
  
  
  
    if (!country_info) {
      return (
        <div>
          <h1>Country: {current_country}</h1>
          <div>No Data</div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Country: {current_country}</h1>
          <ul className="list-group">
            {country_info.map((ci) => (
              <li className="list-group-item" key={ci.code}>
                <p>Code: {ci.code}</p>
                <p>Capital: {ci.capital}</p>
                <p>District: {ci.district}</p>
                <p>Population: {ci.population}</p>
                <p>Continent: {ci.continent}</p>
                <p>Surfacearea: {ci.surfacearea}</p>
                <p>Indepyear: {ci.indepyear}</p>
                <p>Localname: {ci.localname}</p>
                <p>Headofstate: {ci.headofstate}</p>
                <p>Governmentform: {ci.governmentform}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
  
