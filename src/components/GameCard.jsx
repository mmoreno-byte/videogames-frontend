import './GameCard.css';

export default function GameCard({ game, onEdit, onDelete }) {
  return (
    <div className="game-card">
      <div className="game-card-header">
        <span className="game-genre">{game.genre}</span>
        <span className="game-rating">⭐ {game.rating}</span>
      </div>
      <h3 className="game-title">{game.title}</h3>
      <p className="game-studio">{game.studio} · {game.releaseYear}</p>
      <p className="game-platform">🕹️ {game.platform}</p>
      {game.description && (
        <p className="game-description">{game.description}</p>
      )}
      <div className="game-actions">
        <button className="btn-edit" onClick={() => onEdit(game)}>Editar</button>
        <button className="btn-delete" onClick={() => onDelete(game.id)}>Eliminar</button>
      </div>
    </div>
  );
}