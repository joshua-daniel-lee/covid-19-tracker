import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("country code = " + countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        console.log("Data = " + data);
      });
  };

  console.log("country info = " + countryInfo);

  return (
    <div className="app">
      {/* Header */}
      <div className="app__appbar">
        <Typography>COVID-19 Tracker</Typography>
        {/* State List */}
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Info Box */}
      <div className="app__stats">
        <InfoBox title="Cases" cases={countryInfo.todaysCases} total={2000} />
        <InfoBox title="Recovered" cases={1000} total={2000} />
        <InfoBox title="Deaths" cases={1000} total={2000} />
      </div>
      <Card className="app__graphs">
        <CardContent>
          <h4>Cases by Conuntry</h4>
          <h4>Cases Worldwide</h4>
        </CardContent>
        {/* Table */}
        {/* Graph */}
      </Card>
      {/* Map */}
      <div className="app__map">
        <Map />
      </div>
    </div>
  );
}

export default App;
