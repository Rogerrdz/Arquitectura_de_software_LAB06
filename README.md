# Arquitectura_de_software_LAB06

Guia para ejecutar y probar el proyecto completo (backend + frontend) en local.

## 1. Estructura del proyecto

- `BluePrints/`: Backend Spring Boot (API de blueprints, JWT, Swagger, perfiles de persistencia).
- `React_Client/`: Frontend React + Vite + Redux + Axios + pruebas con Vitest.

## 2. Clonar el repositorio y ubicarse en la carpeta raiz

Si aun no tienes el proyecto en local:

```bash
git clone https://github.com/Rogerrdz/Arquitectura_de_software_LAB06.git
cd Arquitectura_de_software_LAB06
```

Si ya lo tienes clonado:

```bash
cd Arquitectura_de_software_LAB06
git pull
```

Todos los comandos de este README asumen que estas ubicado en la carpeta raiz `Arquitectura_de_software_LAB06`.

## 3. Requisitos

- Java 21
- Maven 3.9+
- Node.js 18+ y npm
- Docker Desktop (opcional, solo si vas a usar PostgreSQL)

## 4. Credenciales disponibles para pruebas

### Login de la aplicacion

- Endpoint: `POST /api/auth/login`
- El backend actualmente acepta cualquier `username` y `password`.
  
- Credenciales de ejemplo recomendadas:
  - Usuario: `user`
  - Password: `password123`

### PostgreSQL (si usas perfil `postgres`)

- Host: `localhost`
- Puerto: `5432`
- Base de datos: `blueprints_db`
- Usuario: `postgres`
- Password: `postgres`

## 5. Ejecutar backend (BluePrints)

Desde la raiz `Arquitectura_de_software_LAB06`:

```bash
cd BluePrints
mvn clean install
```

### Opcion A: Ejecutar con persistencia en memoria (default)

```bash
mvn spring-boot:run
```

### Opcion B: Ejecutar con PostgreSQL

```bash
docker-compose up -d
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

### URLs del backend

- API base: `http://localhost:8081/api/v1/blueprints`
- Auth: `http://localhost:8081/api/auth/login`
- Swagger UI: `http://localhost:8081/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8081/v3/api-docs`
- Health: `http://localhost:8081/actuator/health`

## 6. Ejecutar frontend (React_Client)

En otra terminal, desde la raiz `Arquitectura_de_software_LAB06`:

```bash
cd React_Client
npm install
```

Si no tienes `.env`, crealo tomando como base `.env.example`:

- Linux/macOS (bash):

```bash
cp .env.example .env
```

- Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Valores recomendados para consumir el backend real:

```env
VITE_API_BASE_URL=http://localhost:8081/api
VITE_USE_MOCK=false
```

Si quieres probar solo frontend sin levantar backend, usa modo mock:

```env
VITE_USE_MOCK=true
```

Inicia el frontend:

```bash
npm run dev
```

URL frontend: `http://localhost:5173`

## 7. Flujo rapido de uso (end-to-end)

1. Inicia backend en `8081`.
2. Inicia frontend en `5173`.
3. Abre `http://localhost:5173`.
4. Haz login con `user / password123` (o cualquier usuario/password no vacios).
5. Consulta blueprints por autor.
6. Abre un blueprint para verlo en canvas.
7. Crea, actualiza y elimina blueprints desde la UI.

## 8. Como probar el backend

### 8.1 Pruebas unitarias/integracion (Maven)

```bash
cd BluePrints
mvn test
```

### 8.2 Script de pruebas API

Con el backend arriba en `8081`:

- PowerShell (Windows):

```powershell
cd BluePrints
.\test-api.ps1
```

- Bash (Linux/macOS):

```bash
cd BluePrints
chmod +x test-api.sh
./test-api.sh
```

### 8.3 Pruebas manuales rapidas con curl

```bash
# Obtener todos
curl -s http://localhost:8081/api/v1/blueprints

# Login
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"password123"}'
```

## 9. Como probar el frontend

Con el backend en ejecucion y `.env` apuntando a `http://localhost:8081/api`:

```bash
cd React_Client
npm test
```

Nota: las pruebas unitarias del frontend pueden correr sin backend porque usan mocks.

Tambien puedes validar visualmente:

1. Login exitoso.
2. Carga de lista por autor.
3. Render del canvas.
4. Operaciones CRUD desde la interfaz.
5. Manejo de errores y reintento (si hay fallos de red/API).

## 10. Endpoints principales

Nota de versionado: en este repo la ruta vigente es `/api/v1/blueprints`. Si en alguna documentacion antigua ves `/api/blueprints`, toma este README principal como referencia oficial.

- `GET /api/v1/blueprints`
- `GET /api/v1/blueprints/{author}`
- `GET /api/v1/blueprints/{author}/{bpname}`
- `POST /api/v1/blueprints`
- `PUT /api/v1/blueprints/{author}/{bpname}/points`
- `PUT /api/v1/blueprints/{author}/{bpname}`
- `DELETE /api/v1/blueprints/{author}/{bpname}`
- `POST /api/auth/login`

## 11. Documentacion complementaria

- `React_Client/README.md`: guia del laboratorio frontend.
- `React_Client/README_MAIN.md`: guia detallada del monorepo/frontend.

## 12. Troubleshooting rapido

- Si el frontend no conecta:
  - Verifica que backend este en `http://localhost:8081`.
  - Verifica `VITE_API_BASE_URL` en `React_Client/.env`.
- Si falla PostgreSQL:
  - Revisa `docker ps` y logs del contenedor `blueprints-postgres`.
  - Verifica credenciales `postgres/postgres`.
- Si hay error de CORS:
  - Abre frontend en `http://localhost:5173` (origen permitido en backend).
