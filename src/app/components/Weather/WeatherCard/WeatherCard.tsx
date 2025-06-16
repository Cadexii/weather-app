"use client";

import { useState } from "react";
import styles from "./weatherCard.module.css";
import { Icon } from "@iconify/react";

type Props = {
  borderColor: string;
  weatherIcon: string;
  city: string;
  country: string;
  temperature: number;
  weather: string;
  isAdded: boolean;
  isFavorite: boolean;
  onAddRemove?: () => void;
  onFavorite: () => void;
};

const WeatherCard: React.FC<Props> = ({
  borderColor,
  weatherIcon,
  city,
  country,
  temperature,
  weather,
  isAdded,
  isFavorite,
  onAddRemove,
  onFavorite,
}) => {
  const [hovering, setHovering] = useState(false);
  const [hoveringFavorite, setHoveringFavorite] = useState(false);

  return (
    <div
      className={styles.container}
      style={{
        borderTop: `5px solid ${borderColor}`,
        borderBottom: `5px solid ${borderColor}`,
      }}
    >
      {!isFavorite && (
        <button
          className={styles.addRemove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={onAddRemove}
        >
          <Icon
            icon={
              isAdded
                ? hovering
                  ? "ic:round-remove-circle"
                  : "ic:round-remove-circle-outline"
                : hovering
                ? "material-symbols:add-circle-rounded"
                : "material-symbols:add-circle-outline-rounded"
            }
            width={25}
          />
        </button>
      )}
      {isAdded && (
        <button
          className={styles.favorite}
          onClick={onFavorite}
          onMouseEnter={() => setHoveringFavorite(true)}
          onMouseLeave={() => setHoveringFavorite(false)}
        >
          <Icon
            icon={
              isFavorite
                ? hoveringFavorite
                  ? "material-symbols:star-outline"
                  : "material-symbols:star"
                : hoveringFavorite
                ? "material-symbols:star"
                : "material-symbols:star-outline"
            }
            width={25}
          />
        </button>
      )}
      <Icon icon={weatherIcon} width={50} height={50} />
      <p>
        {city}, {country}
      </p>
      <h2>
        {temperature}°C, {weather}
      </h2>
    </div>
  );
};

export default WeatherCard;
