import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const fetchCountries = async () => {
    try {
      let response = await axios.get("https://crio-location-selector.onrender.com/countries");
      setCountries(response.data);
    } catch (e) {
      console.log(e);
    }

  }

  const fetchState = async (countryName) => {
    try {
      if (countryName) {
        let response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
        setStates(response.data);
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  const fetchCity = async (countryName, stateName) => {
    try {
      let response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`)
      setCities(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchCity(selectedCountry, selectedState);
    setSelectedCity('');
  }, [selectedState]);

  useEffect(() => {
    fetchState(selectedCountry);
    setSelectedState('');
    setSelectedCity('');
  }, [selectedCountry])

  useEffect(() => {
    fetchCountries();
  }, [])
  return (
    <div className='citySelector'>
      <h1>Select Location</h1>
      <div className='dropdowns'>
        <select value={selectedCountry} className='dropdown' onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="" disabled>Select Country</option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>{country}</option>
            )
          })}
        </select>
        <select className='dropdown' value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="" disabled>Select State</option>
          {states.map((state) => {
            return (
              <option key={state} value={state}>{state}</option>
            )
          })}
        </select>
        <select className='dropdown' value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="" disabled>Select State</option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>{city}</option>
            )
          })}
        </select>
      </div>
      {selectedCity && <h2 className='result'>You Selected <span className='highlight'>{selectedCity}</span>
        <span className='fade'>{" "}{selectedState}, {selectedCountry}</span>
      </h2>}
    </div>
  );
}

export default App;
