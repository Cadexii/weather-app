"use client";

import { useEffect, useState } from "react";
import Container from "../../Container/Container";
import FavoriteWeatherDisplay from "../FavoriteWeatherDisplay/FavoriteWeatherDisplay";
import SavedWeatherDisplay from "../SavedWeatherDisplay/SavedWeatherDisplay";
import { useAuth } from "../../Contexts/AuthProvider";
import { getFavoritePlaces } from "@/app/utils/firestoreService";

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
        const places = await getFavoritePlaces(user.uid);
        setFavoritePlaces(places ?? []);
      }
    };
    fetchFavoritePlaces();
  }, [user]);

  const updateFavoritePlaces = (placeId: string, isFavorite: boolean) => {
    if (isFavorite) {
      setFavoritePlaces((prev) => prev.filter((place) => place.id !== placeId));
    } else {
      const existingPlace = favoritePlaces.find(
        (place) => place.id === placeId
      );
      setFavoritePlaces((prev) => [
        ...prev,
        { id: placeId, place: existingPlace ? existingPlace.place : "" },
      ]);
    }
  };

  return (
    <>
      <Container isGrid title="Favorite Places:">
        <FavoriteWeatherDisplay />
      </Container>
      <Container isGrid title="Your Places:">
        <SavedWeatherDisplay />
      </Container>
    </>
  );
};

export default DisplayWeather;
