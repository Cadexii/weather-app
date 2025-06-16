import ProtectedRoute from "../components/Contexts/ProtectedRoute";
import DisplayWeather from "../components/Weather/DisplayWeather/DisplayWeather";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DisplayWeather />
    </ProtectedRoute>
  );
}
