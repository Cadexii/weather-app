"use client";

import styles from "./weatherSearch.module.css";
import { useState } from "react";
import { fetchWeather } from "@/app/api/fetchWeather";
import { geocodeCity } from "@/app/api/geocodeCity";
import WeatherCard from "../WeatherCard/WeatherCard";
import { weatherCodeMap } from "@/app/utils/weatherCodeMap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type WeatherProps = {
  current_weather: {
    city: string;
    country: string;
    temperature: number;
    weathercode: number;
  };
};

const WeatherSearch = () => {
  const [weatherData, setWeatherData] = useState<WeatherProps | null>(null);
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { label, icon, borderColor } =
    weatherData && weatherData.current_weather.weathercode in weatherCodeMap
      ? weatherCodeMap[weatherData.current_weather.weathercode]
      : { label: "Unknown", icon: "mdi:weather-sunny", borderColor: "#ccc" };

  const handleSearch = async () => {
    setWeatherData(null);
    setLoading(true);
    setError(null);

    try {
      const geo = await geocodeCity(input);
      const weather = await fetchWeather(geo.lat, geo.lon);
      setCity(geo.name);
      setCountry(geo.country);
      setWeatherData(weather);
      setLoading(false);
      setInput("");
    } catch {
      setError("Failed to find weather, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a place..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className={styles.resultsContainer}>
        {loading && (
          <Skeleton
            height={154}
            borderRadius={20}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
          />
        )}
        {error && <p className={styles.error}>{error}</p>}
        {weatherData && (
          <WeatherCard
            borderColor={borderColor}
            weatherIcon={icon}
            city={city}
            country={country}
            temperature={weatherData.current_weather.temperature}
            weather={label}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherSearch;
