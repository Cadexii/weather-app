"use client";

import { useState } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";

const SavedWeatherDisplay = () => {
  const [savedPlaced, setSavedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <WeatherCard
        borderColor="yellow"
        city="Warsaw"
        country="Poland"
        temperature={23}
        weather="Sunny"
        weatherIcon="mdi:weather-sunny"
        isAdded={true}
      />
    </>
  );
};

export default SavedWeatherDisplay;
