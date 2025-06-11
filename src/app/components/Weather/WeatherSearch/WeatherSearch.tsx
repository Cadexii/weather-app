import styles from "./weatherSearch.module.css";
import useState from "react";

const WeatherSearch = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search for a place..." />
        <button className={styles.searchButton}>Search</button>
      </div>
      <div className={styles.resultsContainer}></div>
    </div>
  );
};

export default WeatherSearch;
