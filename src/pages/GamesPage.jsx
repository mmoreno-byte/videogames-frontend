import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGames, deleteGame, searchGames, getGamesByGenre } from '../services/api';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/GameCard';
import GameForm from '../components/GameForm';
import './GamesPage.css';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editGame, setEditGame] = useState(null);
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await getGames();
      setGames(res.data);
    } catch {
      logoutUser();
      navigate('/videogames-frontend/games');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGames(); }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return fetchGames();
    const res = await searchGames(search);
    setGames(res.data);
  };

  const handleGenre = async (e) => {
    const val = e.target.value;
    setGenre(val);
    if (!val) return fetchGames();
    const res = await getGamesByGenre(val);
    setGames(res.data);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este juego?')) return;
    await deleteGame(id);
    fetchGames();
  };

  const handleEdit = (game) => {
    setEditGame(game);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditGame(null);
    fetchGames();
  };

  return (
    <div className="games-wrapper">
      <header className="games-header">
        <h1>🎮 Videogames</h1>
        <div className="games-header-actions">
          <button className="btn-add" onClick={() => setShowForm(true)}>+ Añadir juego</button>
          <button className="btn-logout" onClick={() => { logoutUser(); navigate('/'); }}>Salir</button>
        </div>
      </header>

      <div className="games-filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter-input"
          />
          <button type="submit" className="btn-search">Buscar</button>
        </form>
        <select value={genre} onChange={handleGenre} className="filter-input">
          <option value="">Todos los géneros</option>
          <option value="Aventura">Aventura</option>
          <option value="Acción">Acción</option>
          <option value="RPG">RPG</option>
          <option value="Deportes">Deportes</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Plataformas">Plataformas</option>
        </select>
      </div>

      {loading ? (
        <p className="games-loading">Cargando juegos...</p>
      ) : games.length === 0 ? (
        <p className="games-empty">No hay juegos todavía. ¡Añade el primero!</p>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <GameForm
          game={editGame}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}