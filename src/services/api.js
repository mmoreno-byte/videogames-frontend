import axios from 'axios';

const API_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) =>
  api.post('/api/auth/login', { username, password });

export const register = (username, password) =>
  api.post('/api/auth/register', { username, password });

export const getGames = () => api.get('/api/games');
export const getGameById = (id) => api.get(`/api/games/${id}`);
export const getGamesByGenre = (genre) => api.get(`/api/games/genre/${genre}`);
export const getGamesByPlatform = (platform) => api.get(`/api/games/platform/${platform}`);
export const searchGames = (title) => api.get(`/api/games/search?title=${title}`);
export const createGame = (game) => api.post('/api/games', game);
export const updateGame = (id, game) => api.put(`/api/games/${id}`, game);
export const deleteGame = (id) => api.delete(`/api/games/${id}`);

export default api;