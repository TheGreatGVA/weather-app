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

  const getWeather = async () => {
    try {
      const res = await axios.get(`https://weather-app-6bn3.onrender.com/api/weather?city=${city}`);
      setWeather(res.data);
      setError("");

      const forecastRes = await axios.get(`https://weather-app-6bn3.onrender.com/api/forecast?city=${city}`);
      const dailyForecast = processForecast(forecastRes.data);
      setForecast(dailyForecast);

    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError("City not found or API error.");
    }
  };

  // Process forecast into daily min/max + icon
  const processForecast = (data) => {
    const daily = {};
    data.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
      if (!daily[date]) {
        daily[date] = { min: item.main.temp, max: item.main.temp, icon: item.weather[0].icon, desc: item.weather[0].description };
      } else {
        daily[date].min = Math.min(daily[date].min, item.main.temp);
        daily[date].max = Math.max(daily[date].max, item.main.temp);
      }
    });
    return Object.entries(daily).map(([date, info]) => ({ date, ...info }));
  };

  return (
    <div className="App">
      <header className="header">
        <div id="time">{new Date().toLocaleTimeString()}</div>
        <h1>Weather App</h1>
      </header>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Updates</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && <WeatherDisplay data={weather} />}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
    </div>
  );
}

export default App;
