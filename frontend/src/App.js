import React, { useState } from "react";
import axios from "axios";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const popularCities = ["London", "Hyderabad", "Tokyo", "Paris", "Delhi"];

  const getWeather = async (cityName) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/weather?city=${cityName}`);
      setWeather(res.data);
      setError("");

      const forecastRes = await axios.get(`http://localhost:3001/api/forecast?city=${cityName}`);
      const dailyForecast = processForecast(forecastRes.data);
      setForecast(dailyForecast);
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError("City not found or API error.");
    }
  };

  const handleSearch = (cityToSearch) => {
    const finalCity = cityToSearch || city;
    if (!finalCity) return;
    setCity(finalCity); // update input field
    getWeather(finalCity);
  };

  const processForecast = (data) => {
    const daily = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!daily[date]) {
        daily[date] = {
          min: item.main.temp,
          max: item.main.temp,
          icon: item.weather[0].icon,
          desc: item.weather[0].description,
        };
      } else {
        daily[date].min = Math.min(daily[date].min, item.main.temp);
        daily[date].max = Math.max(daily[date].max, item.main.temp);
      }
    });
    return Object.entries(daily).map(([date, info]) => ({ date, ...info }));
  };

  return (
    <div className="app-container">
      {/* LEFT COLUMN */}
      <div className="sidebar">
        <h2>Weather App</h2>
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>

        <div className="popular-cities">
          <h3>Favorite Cities</h3>
          {popularCities.map((c) => (
            <button
              key={c}
              onClick={() => handleSearch(c)}
              className="city-btn"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="main-content">
        {error && <p className="error">{error}</p>}
        {weather && (
          <>
            <WeatherDisplay data={weather} />
            {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
          </>
        )}
        {!weather && <p>Search for a city to see weather updates.</p>}
      </div>
    </div>
  );
}

export default App;
