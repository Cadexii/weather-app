"use client";

import styles from "./weatherSearch.module.css";
import { useEffect, useState } from "react";
import { fetchWeather } from "@/app/api/fetchWeather";
import { geocodeCity } from "@/app/api/geocodeCity";
import WeatherCard from "../WeatherCard/WeatherCard";
import { weatherCodeMap } from "@/app/utils/weatherCodeMap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../../Contexts/AuthProvider";
import {
  addFavoritePlace,
  addPlace,
  getFavoritePlaces,
  getPlaces,
  removeFavoritePlace,
  removePlace,
} from "@/app/utils/firestoreService";

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

const WeatherSearch = () => {
  const [weatherData, setWeatherData] = useState<WeatherProps | null>(null);
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { user } = useAuth();

  const { label, icon, borderColor } =
    weatherData && weatherData.current_weather.weathercode in weatherCodeMap
      ? weatherCodeMap[weatherData.current_weather.weathercode]
      : { label: "Unknown", icon: "mdi:weather-sunny", borderColor: "#ccc" };

  useEffect(() => {
    const checkIfPlaceSaved = async () => {
      if (user && (city || country)) {
        const savedPlaces = await getPlaces(user.uid);
        const isSaved = (savedPlaces ?? []).some(
          (place) => place.place === city || place.place === country
        );
        setAdded(isSaved);
      }
    };
    checkIfPlaceSaved();
  }, [city, country, user]);

  const handleAddRemovePlace = async () => {
    if (user) {
      if (added) {
        const placeId = weatherData?.id;
        if (placeId) {
          await removePlace(placeId, user.uid);
          setAdded(false);
        }
      } else {
        const newPlaceId = await addPlace(
          {
            place: city || country,
          },
          user.uid
        );

        setWeatherData((prev) => (prev ? { ...prev, id: newPlaceId } : null));
        setAdded(true);
      }
    }
  };

  const handleFavoritePlace = async () => {
    if (user) {
      if (added) {
        if (favorite) {
          const placeId = weatherData?.id;
          if (placeId) {
            await removeFavoritePlace(placeId, user.uid);
            setFavorite(false);
          }
        } else {
          const newPlaceId = await addFavoritePlace(
            {
              place: city || country,
            },
            user.uid
          );

          setWeatherData((prev) => (prev ? { ...prev, id: newPlaceId } : null));
          setFavorite(true);
        }
      }
    }
  };

  const handleSearch = async () => {
    setWeatherData(null);
    setLoading(true);
    setError(null);

    try {
      const geo = await geocodeCity(input);
      const weather = await fetchWeather(geo.lat, geo.lon);
      setCity(geo.name);
      setCountry(geo.country);

      let docId = "";
      if (user) {
        const savedPlaces = await getPlaces(user.uid);
        const found = (savedPlaces ?? []).find(
          (place) => place.place === geo.name || place.place === geo.country
        );
        docId = found?.id || "";
      }
      setWeatherData({
        ...weather,
        id: docId,
      });
      setLoading(false);
      setInput("");

      if (user) {
        const savedPlaces = await getPlaces(user.uid);
        const favoritePlaces = await getFavoritePlaces(user.uid);
        setAdded(
          (savedPlaces ?? []).some(
            (place) => place.place === geo.name || place.place === geo.country
          )
        );
        setFavorite(
          (favoritePlaces ?? []).some(
            (place) => place.place === geo.name || place.place === geo.country
          )
        );
      }
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
            height={150}
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
            isAdded={added}
            isFavorite={favorite}
            onAddRemove={handleAddRemovePlace}
            onFavorite={handleFavoritePlace}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherSearch;
