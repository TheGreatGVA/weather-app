import React from "react";
import "./ForecastDisplay.css";

function ForecastDisplay({ forecast }) {
  return (
    <div className="forecast-container">
      {forecast.map((day, idx) => (
        <div key={idx} className="forecast-card">
          <h3>{new Date(day.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</h3>
          <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="weather icon" />
          <p>{day.desc}</p>
          <p>{day.max.toFixed(0)}°C / {day.min.toFixed(0)}°C</p>
          {/* <p>Min: {day.min.toFixed(1)}°C</p> */}
          {/* <p>Max: {day.max.toFixed(1)}°C</p> */}
        </div>
      ))}
    </div>
  );
}

export default ForecastDisplay;
