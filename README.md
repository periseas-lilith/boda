# Invitación — React + Vite + Material UI (Docker incluido)

## Requisitos locales
- Node.js 18+
- npm

### Arranque local (sin Docker)
```bash
npm i
npm run dev
# abrir http://localhost:5173
```

## Desarrollo con Docker (hot reload)
```bash
docker compose up --build
# abrir http://localhost:5173
```
- Edita el código en tu máquina; el contenedor recarga los cambios.
- Si instalas paquetes nuevos, vuelve a `docker compose up --build`.

## Build de producción (Nginx)
```bash
docker build -t invitacion-react:prod .
docker run -p 8080:80 invitacion-react:prod
# abrir http://localhost:8080
```

## Dónde editar
- **Config**: `src/config.js` (WhatsApp, mapas, menú, fotos, etc.).
- **Estructura**: `src/App.jsx`.
- **Componentes**: `src/components/`.
- **Estilos base**: `src/styles.css`.

## Personaliza rápido
En `src/config.js` cambia:
- `whatsappNumber` (con lada, ej. `5212210000000`)
- `mapCeremony`, `mapReception`, `menuUrl`, `religiousLink`
- `buffetPhotos`, `coupleGallery`

¡Listo para VS Code y Docker! ✨
