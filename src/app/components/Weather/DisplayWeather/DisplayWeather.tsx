"use client";

import { useEffect, useState } from "react";
import Container from "../../Container/Container";
import { useAuth } from "../../Contexts/AuthProvider";
import FavoriteWeatherDisplay from "../FavoriteWeatherDisplay/FavoriteWeatherDisplay";
import SavedWeatherDisplay from "../SavedWeatherDisplay/SavedWeatherDisplay";
import {
  addFavoritePlace,
  getFavoritePlaces,
  removeFavoritePlace,
} from "@/app/utils/firestoreService";

type Place = {
  id?: string;
  place: string;
};

const DisplayWeather = () => {
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavoritePlaces = async () => {
      if (user) {
        const favorites = await getFavoritePlaces(user.uid);
        setFavoritePlaces(favorites ?? []);
      }
    };
    fetchFavoritePlaces();
  }, [user]);

  const addFavorite = async (place: Place) => {
    if (user) {
      const newFavoriteId = await addFavoritePlace(place, user.uid);
      if (newFavoriteId) {
        setFavoritePlaces((prevFavorites) => [
          { ...place, id: newFavoriteId },
          ...prevFavorites,
        ]);
      }
    }
  };

  const removeFavorite = async (placeId: string) => {
    if (user) {
      await removeFavoritePlace(placeId, user.uid);
      setFavoritePlaces((prevFavorites) =>
        prevFavorites.filter((place) => place.id !== placeId)
      );
    }
  };

  return (
    <>
      <Container isGrid title="Favorite Places:">
        <FavoriteWeatherDisplay
          favoritePlaces={favoritePlaces}
          onRemoveFavorite={removeFavorite}
        />
      </Container>
      <Container isGrid title="Your Places:">
        <SavedWeatherDisplay
          favoritePlaces={favoritePlaces}
          onAddFavorite={addFavorite}
          onRemoveFavorite={removeFavorite}
        />
      </Container>
    </>
  );
};

export default DisplayWeather;
