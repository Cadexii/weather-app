import styles from "./savedWeatherDisplay.module.css";
import WeatherCard from "../WeatherCard/WeatherCard";

const SavedWeatherDisplay = () => {
  return (
    <>
      <WeatherCard
        borderColor="yellow"
        city="Warsaw"
        country="Poland"
        temperature={23}
        weather="Sunny"
        weatherIcon="mdi:weather-sunny"
      />
    </>
  );
};

export default SavedWeatherDisplay;
