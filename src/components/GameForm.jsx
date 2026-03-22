import { useState, useEffect } from 'react';
import { createGame, updateGame } from '../services/api';
import './GameForm.css';

const empty = {
  title: '', genre: '', studio: '',
  releaseYear: 2020, rating: 7.0,
  platform: '', description: ''
};

export default function GameForm({ game, onClose }) {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (game) setForm(game);
    else setForm(empty);
  }, [game]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (game) {
        await updateGame(game.id, form);
      } else {
        await createGame(form);
      }
      onClose();
    } catch {
      setError('Error al guardar el juego');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="form-card">
        <div className="form-header">
          <h2>{game ? 'Editar juego' : 'Añadir juego'}</h2>
          <button className="form-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-row">
            <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
            <input name="studio" placeholder="Estudio" value={form.studio} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input name="genre" placeholder="Género" value={form.genre} onChange={handleChange} required />
            <input name="platform" placeholder="Plataforma" value={form.platform} onChange={handleChange} />
          </div>
          <div className="form-row">
            <input name="releaseYear" type="number" placeholder="Año" value={form.releaseYear} onChange={handleChange} min="1970" max="2030" required />
            <input name="rating" type="number" placeholder="Puntuación" value={form.rating} onChange={handleChange} min="0" max="10" step="0.1" required />
          </div>
          <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} rows={3} />
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Guardando...' : game ? 'Actualizar' : 'Crear juego'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}