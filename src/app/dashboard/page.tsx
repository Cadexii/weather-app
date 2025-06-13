import Container from "../components/Container/Container";
import ProtectedRoute from "../components/Contexts/ProtectedRoute";
import FavoriteWeatherDisplay from "../components/Weather/FavoriteWeatherDisplay/FavoriteWeatherDisplay";
import SavedWeatherDisplay from "../components/Weather/SavedWeatherDisplay/SavedWeatherDisplay";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Container isGrid title="Favorite Places:">
        <FavoriteWeatherDisplay />
      </Container>
      <Container isGrid title="Your Places:">
        <SavedWeatherDisplay />
      </Container>
    </ProtectedRoute>
  );
}
