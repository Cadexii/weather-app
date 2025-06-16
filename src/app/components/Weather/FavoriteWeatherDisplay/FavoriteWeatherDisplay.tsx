"use client";

import { fetchWeather } from "@/app/api/fetchWeather";
import { geocodeCity } from "@/app/api/geocodeCity";
import { useEffect, useState } from "react";
import { weatherCodeMap } from "@/app/utils/weatherCodeMap";
import WeatherCard from "../WeatherCard/WeatherCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  favoritePlaces: Place[];
  onRemoveFavorite: (placeId: string) => void;
};

type WeatherProps = {
  id?: string;
  current_weather: {
    city: string;
    country: string;
    temperature: number;
    weathercode: number;
    latitude: number;
    longitude: number;
  };
};

type Place = {
  id?: string;
  place: string;
};

const FavoriteWeatherDisplay: React.FC<Props> = ({
  favoritePlaces,
  onRemoveFavorite,
}) => {
  const [weatherData, setWeatherData] = useState<(WeatherProps | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!favoritePlaces.length) return;

      setIsLoading(true);

      const weatherPromises = favoritePlaces.map(async (place) => {
        const geo = await geocodeCity(place.place);
        const weather = await fetchWeather(geo.lat, geo.lon);
        return {
          ...weather,
          current_weather: {
            ...weather.current_weather,
            city: place.place,
            country: geo.country,
          },
        };
      });

      const weatherResults = await Promise.all(weatherPromises);
      setWeatherData(weatherResults);
      setIsLoading(false);
    };

    fetchWeatherData();
  }, [favoritePlaces]);

  return (
    <>
      {isLoading
        ? Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              count={1}
              height={150}
              borderRadius={20}
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
            />
          ))
        : favoritePlaces.length > 0 &&
          favoritePlaces.map((place, index) => {
            const weatherInfo = weatherData[index];

            const label =
              weatherInfo &&
              weatherCodeMap[weatherInfo.current_weather.weathercode]
                ? weatherCodeMap[weatherInfo.current_weather.weathercode].label
                : "Unknown";

            const weatherIcon =
              weatherInfo &&
              weatherCodeMap[weatherInfo.current_weather.weathercode]
                ? weatherCodeMap[weatherInfo.current_weather.weathercode].icon
                : "mdi:weather-sunny";

            const borderColor =
              weatherInfo &&
              weatherCodeMap[weatherInfo.current_weather.weathercode]
                ? weatherCodeMap[weatherInfo.current_weather.weathercode]
                    .borderColor
                : "#ccc";

            return (
              <WeatherCard
                key={place.id}
                borderColor={borderColor}
                weatherIcon={weatherIcon}
                city={weatherInfo?.current_weather.city || place.place}
                country={weatherInfo?.current_weather.country || "Unknown"}
                temperature={weatherInfo?.current_weather.temperature || 0}
                weather={label}
                isAdded={true}
                isFavorite={true}
                onFavorite={() => onRemoveFavorite(place.id || "")}
              />
            );
          })}
    </>
  );
};

export default FavoriteWeatherDisplay;
