export const geocodeCity = async (city: string) => {
    const data = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`).then((res) => res.json())

    const { latitude, longitude } = data.results[0]

    return {
        lat: latitude,
        lon: longitude,
        name: data.results[0].name,
        country: data.results[0].country,
    }
}