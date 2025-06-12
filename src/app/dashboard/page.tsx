import Container from "../components/Container/Container";
import ProtectedRoute from "../components/Contexts/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Container isGrid title="Your Places:">
        <h2>No Places Saved</h2>
      </Container>
    </ProtectedRoute>
  );
}
