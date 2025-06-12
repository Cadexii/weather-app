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
  onAddRemove?: () => void;
};

const WeatherCard: React.FC<Props> = ({
  borderColor,
  weatherIcon,
  city,
  country,
  temperature,
  weather,
  isAdded,
  onAddRemove,
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className={styles.container}
      style={{
        borderTop: `5px solid ${borderColor}`,
        borderBottom: `5px solid ${borderColor}`,
      }}
    >
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
