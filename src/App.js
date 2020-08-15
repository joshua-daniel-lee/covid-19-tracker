import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";

// https://disease.sh/v3/covid-19/states

function App() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    console.log("useEffect has fired off");
    const getStatesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/states").then((response) =>
        response.json().then((data) => {
          const states = data.map((state) => ({
            name: state.state,
          }));
          setStates(states);
        })
      );
    };
    getStatesData();
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <div className="app_state_selector">
        <FormControl className="app_dropdown">
          <Select variant="standard" value="#">
            {states.map((states) => (
              <MenuItem value={states.value}>{states.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
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
