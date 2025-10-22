import React from "react";
import "./WeatherDisplay.css";

function WeatherDisplay({ data }) {
  const { name, sys, main, weather, wind } = data;

  return (
    <div className="weather-container">
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <h1>{main.temp}°C</h1>
      <h2>{name}, {sys.country}</h2>
      <p>💧 Humidity: {main.humidity}%</p>
      <p>🌬 Wind Speed: {wind.speed} m/s</p>
      <p>☁ Condition: {weather[0].description}</p>
      
    </div>
  );
}

export default WeatherDisplay;
