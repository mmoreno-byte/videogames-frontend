# 🎮 Videogames Frontend

Aplicación web para gestionar una colección de videojuegos, conectada a una API REST con autenticación JWT.

## 🌐 Ver en vivo
[mmoreno-byte.github.io/videogames-frontend](https://mmoreno-byte.github.io/videogames-frontend/)

## ✨ Características
- Registro e inicio de sesión con JWT
- Listado de videojuegos con tarjetas interactivas
- Buscador por título y filtro por género
- Crear, editar y eliminar videojuegos
- Diseño oscuro y responsive
- Desplegado en GitHub Pages

## 🛠️ Tecnologías
- React 19
- Vite
- React Router DOM
- Axios
- CSS3

## 🔗 API
Conectado a [videogames-api](https://github.com/mmoreno-byte/videogames-api). Para usar localmente, asegúrate de que la API esté ejecutándose en `http://localhost:8080`.

### Configurar la URL de la API
Si necesitas cambiar la URL de la API, edita el archivo de configuración o variables de entorno:
- Por defecto, apunta a `http://localhost:8080`
- Para producción, actualiza la variable de entorno `VITE_API_URL`

## 📦 Instalación local

### Requisitos
- Node.js 18+
- API REST ejecutándose en `http://localhost:8080`

### Pasos
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/mmoreno-byte/videogames-frontend.git
   cd videogames-frontend
   ```

2. **Instala dependencias:**
   ```bash
   npm install
   ```

3. **Asegúrate de que la API esté ejecutándose:**
   ```bash
   cd ../videogames-api
   ./mvnw spring-boot:run
   ```

4. **En otra terminal, ejecuta el frontend:**
   ```bash
   npm run dev
   ```

5. **Accede a la aplicación:**
   - Frontend: `http://localhost:5173`
   - API Swagger: `http://localhost:8080/swagger-ui.html`

### Credenciales de prueba
Usuario de prueba: `demo` / `demo1234` (si la API tiene datos iniciales)

## 👤 Autora
mmorenodev — [GitHub](https://github.com/mmoreno-byte) · [Portfolio](https://mmoreno-byte.github.io/mmorenodev/)