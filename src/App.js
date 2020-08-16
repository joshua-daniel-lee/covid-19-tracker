import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";
import { FormControl, Select, MenuItem, Typography } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="app_appbar">
        <Typography>COVID-19 Tracker</Typography>
      </div>
      {/* State List */}
      <div>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Info Box */}
      <div className="app_stats">
        <InfoBox title="Cases" cases={1000} total={2000} />
        <InfoBox title="Recovered" cases={1000} total={2000} />
        <InfoBox title="Deaths" cases={1000} total={2000} />
      </div>

      {/* Table */}
      {/* Graph */}
      {/* Map */}
      <Map />
    </div>
  );
}

export default App;
