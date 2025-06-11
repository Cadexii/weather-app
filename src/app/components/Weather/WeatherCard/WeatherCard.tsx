import styles from "./weatherCard.module.css";
import { Icon } from "@iconify/react";

type Props = {
  borderColor: string;
  weatherIcon: string;
  city: string;
  country: string;
  temperature: number;
  weather: string;
};

const WeatherCard: React.FC<Props> = ({
  borderColor,
  weatherIcon,
  city,
  country,
  temperature,
  weather,
}) => {
  return (
    <div
      className={styles.container}
      style={{
        borderTop: `5px solid ${borderColor}`,
        borderBottom: `5px solid ${borderColor}`,
      }}
    >
      <Icon icon={weatherIcon} width={50} />
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
