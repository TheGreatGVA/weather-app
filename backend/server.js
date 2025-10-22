import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001; 
const API_KEY = process.env.OPENWEATHER_KEY;

// Route for weather data
app.get("/api/weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City name required" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(404).json({ error: "City not found or API error" });
  }
});

// Forecast route for chart data
// backend/server.js
app.get("/api/forecast", async (req, res) => {
  const { city } = req.query;
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(404).json({ error: "Forecast unavailable" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
