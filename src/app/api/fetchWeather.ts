export const fetchWeather = async (lat: number, lon: number) => {
    return await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`).then((res) => res.json());
}