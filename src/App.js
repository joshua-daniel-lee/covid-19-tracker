import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem, AppBar } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) =>
        response.json().then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        })
      );
    };
    getCountriesData();
  }, []);

  return (
    <div className="appContainer">
      {/* Header */}
      <AppBar className="header" postion="static">
        <p className="title">Title</p>
        <div className="statePicker">
          <FormControl className="app_dropdown">
            <Select variant="outlined" value="#">
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </AppBar>

      {/* State List */}
      {/* Info Box */}
      {/* Info Box */}
      {/* Info Box */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}
    </div>
  );
}

export default App;
