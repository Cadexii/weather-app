import Container from "../components/Container/Container";
import ProtectedRoute from "../components/Contexts/ProtectedRoute";
import WeatherSearch from "../components/Weather/WeatherSearch/WeatherSearch";

export default function Search() {
  return (
    <ProtectedRoute>
      <Container>
        <WeatherSearch />
      </Container>
    </ProtectedRoute>
  );
}
