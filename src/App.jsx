import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  const getWeather = async (city) => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      setError("City not found or an error occurred.");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);
  };

  const handleSearch = async () => {
    await getWeather(city);
    setCity("");
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather App</h1>

      <div>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "10px", marginLeft: "10px", fontSize: "16px" }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
