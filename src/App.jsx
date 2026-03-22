import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import GamesPage from './pages/GamesPage';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/videogames-frontend/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/videogames-frontend/" element={<LoginPage />} />
      <Route path="/videogames-frontend/games" element={
        <PrivateRoute>
          <GamesPage />
        </PrivateRoute>
      } />
    </Routes>
  );
}