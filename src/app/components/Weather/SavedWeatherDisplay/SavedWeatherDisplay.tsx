"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthProvider";
import {
  getPlaces,
  getFavoritePlaces,
  removePlace,
  removeFavoritePlace,
  addFavoritePlace,
} from "@/app/utils/firestoreService";
import { fetchWeather } from "@/app/api/fetchWeather";
import { geocodeCity } from "@/app/api/geocodeCity";
import { weatherCodeMap } from "@/app/utils/weatherCodeMap";
import WeatherCard from "../WeatherCard/WeatherCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

const SavedWeatherDisplay = () => {
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  const [weatherData, setWeatherData] = useState<(WeatherProps | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavoritePlaces = async () => {
      if (!user) return;

      const favorites = await getFavoritePlaces(user.uid);
      setFavoritePlaces(favorites ?? []);
    };
    fetchFavoritePlaces();
  }, [user]);

  const handleRemovePlace = async (placeId: string) => {
    if (user) {
      await removePlace(placeId, user.uid);
      setSavedPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== placeId)
      );
      setWeatherData((prevWeather) =>
        prevWeather.filter(
          (_, index) => index !== savedPlaces.findIndex((p) => p.id === placeId)
        )
      );
    }
  };

  const handleFavoritePlace = async (place: Place) => {
    if (user) {
      const favorite = favoritePlaces.find(
        (favPlace) => favPlace.place === place.place
      );
      const isFavorite = !!favorite;

      if (isFavorite && favorite?.id) {
        await removeFavoritePlace(favorite.id, user.uid);
        setFavoritePlaces((prevFavorites) =>
          prevFavorites.filter((favPlace) => favPlace.id !== favorite.id)
        );
      } else {
        const newFavoriteId = await addFavoritePlace(place, user.uid);
        if (newFavoriteId) {
          setFavoritePlaces((prevFavorites) => [
            ...prevFavorites,
            { ...place, id: newFavoriteId },
          ]);
        }
      }
    }
  };

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      if (!user) return null;

      setIsLoading(true);

      const places = await getPlaces(user.uid);
      setSavedPlaces(places ?? []);

      const weatherPromises = (places ?? []).map(async (place) => {
        const geo = await geocodeCity(place.place);
        const weather = await fetchWeather(geo.lat, geo.lon);
        return {
          ...weather,
          current_weather: {
            ...weather.current_weather,
            city: place.place,
            country: geo.country,
            temperature: weather.current_weather.temperature,
            weathercode: weather.current_weather.weathercode,
            latitude: geo.lat,
            longitude: geo.lon,
          },
        };
      });

      const weatherResults = await Promise.all(weatherPromises);
      setWeatherData(weatherResults);
      setIsLoading(false);
    };
    fetchSavedPlaces();
  }, [user]);

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
        : savedPlaces.length > 0 &&
          savedPlaces.map((place, index) => {
            const weatherInfo = weatherData[index];

            const label =
              weatherInfo &&
              weatherCodeMap[weatherInfo.current_weather.weathercode]
                ? weatherCodeMap[weatherInfo.current_weather.weathercode].label
                : "Unknown";
            const icon =
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
                weatherIcon={icon}
                city={weatherInfo?.current_weather.city || place.place}
                country={weatherInfo?.current_weather.country || "Unknown"}
                temperature={weatherInfo?.current_weather.temperature || 0}
                weather={label}
                isAdded={true}
                isFavorite={favoritePlaces.some(
                  (favPlace) => favPlace.place === place.place
                )}
                onAddRemove={() => handleRemovePlace(place.id || "")}
                onFavorite={() => handleFavoritePlace(place)}
              />
            );
          })}
    </>
  );
};

export default SavedWeatherDisplay;
