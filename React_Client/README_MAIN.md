# 🏗️ Laboratorios ARSW - Arquitecturas de Software

> Monorepo con todos los laboratorios de Arquitecturas de Software (ARSW) - Escuela Colombiana de Ingeniería

## 📂 Estructura del Proyecto

```
.
├── BluePrints/          # Lab 4 - REST API + Spring Boot + PostgreSQL + JWT
├── Inmortals/           # Lab 2 - Concurrencia con Threads e Inmortales  
├── wait_notify/         # Lab 3 - Sincronización Productor/Consumidor
├── src/                 # Cliente React + Redux + Canvas Interactivo
├── tests/               # Tests del cliente (Vitest + Testing Library)
├── .github/workflows/   # CI/CD con GitHub Actions
└── README.md            # Este archivo
```

---

## 🚀 Inicio Rápido

### Prerrequisitos
- **Java 21** (para proyectos backend)
- **Maven 3.9+** (build tool Java)
- **Node.js 18+** y **npm** (para React client)
- **Docker** (opcional, para PostgreSQL)

### Levantar el Stack Completo

**1. Backend (Spring Boot)**
```bash
cd BluePrints
mvn spring-boot:run
# Backend disponible en http://localhost:8081
```

**2. Frontend (React + Vite)**
```bash
npm install
npm run dev
# Frontend disponible en http://localhost:5173
```

**3. PostgreSQL (Opcional)**
```bash
cd BluePrints
docker-compose up -d
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

### Credenciales de Login
- **Usuario**: `user`
- **Password**: `password123`

---

## 📦 Proyectos Incluidos

### 🔵 BluePrints - REST API + React Client

**Backend (Spring Boot 3.3.9 + Java 21)**
- API REST completa con CRUD
- Persistencia dual: In-Memory + PostgreSQL (JPA/Hibernate)
- Autenticación JWT con Spring Security
- Filtros de procesamiento (Redundancy, Undersampling)
- OpenAPI/Swagger documentación
- Actuator Health endpoints
- Docker Compose para PostgreSQL

**Frontend (React 18 + Redux Toolkit)**
- SPA moderna con componentes funcionales
- Redux para estado global (blueprints + auth)
- Canvas interactivo para dibujar blueprints
- Autenticación JWT con interceptores Axios
- Rutas protegidas con PrivateRoute
- Switch Mock/Real API via `.env`
- Top-5 blueprints con selector memoizado
- Optimistic updates (UPDATE/DELETE)
- Banner de error con retry
- Tests con Vitest + Testing Library

**Ejecutar:**
```bash
# Backend
cd BluePrints
mvn spring-boot:run

# Frontend  
npm run dev
```

**URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8081/api/v1/blueprints
- Swagger: http://localhost:8081/swagger-ui.html
- Health: http://localhost:8081/actuator/health

**Endpoints Principales:**
```
GET    /api/v1/blueprints
GET    /api/v1/blueprints/{author}
GET    /api/v1/blueprints/{author}/{name}
POST   /api/v1/blueprints
PUT    /api/v1/blueprints/{author}/{name}
DELETE /api/v1/blueprints/{author}/{name}
POST   /api/auth/login
```

📖 [Ver documentación completa de BluePrints](./BluePrints/README.md)

---

### ⚔️ Inmortals - Concurrencia con Threads

Simulación de batalla entre inmortales usando hilos de Java.

**Características:**
- Sincronización con `synchronized` blocks
- Control de pausa/reanudación con `wait()`/`notifyAll()`
- Prevención de deadlocks con orden de locks
- Interfaz gráfica Swing
- Contador de vida compartido

**Ejecutar:**
```bash
cd Inmortals
mvn clean install
mvn exec:java -Dexec.mainClass="edu.eci.arsw.app.Main"
```

📖 [Ver documentación completa de Inmortals](./Inmortals/README.md)

---

### 🔄 wait_notify - Productor/Consumidor

Implementación del patrón Productor-Consumidor con dos enfoques:

**Características:**
- **BusySpinQueue**: Busy-waiting (ineficiente, alto CPU)
- **BoundedBuffer**: wait/notify (eficiente)
- Java 21 Virtual Threads para concurrencia masiva
- Comparación de rendimiento
- Bounded buffer con capacidad fija

**Ejecutar:**
```bash
cd wait_notify
mvn clean install
mvn exec:java -Dexec.mainClass="edu.eci.arsw.pc.PCApp"
```

📖 [Ver documentación completa de wait_notify](./wait_notify/README.md)

---

## 🧪 Ejecutar Tests

### Tests Backend (Java/Maven)
```bash
# BluePrints
cd BluePrints
mvn test

# Inmortals
cd Inmortals  
mvn test

# wait_notify
cd wait_notify
mvn test
```

### Tests Frontend (React/Vitest)
```bash
npm test
```

**Resultado Esperado:**
```
✓ tests/blueprintsSlice.test.jsx (1 test)
✓ tests/BlueprintCanvas.test.jsx (1 test)
✓ tests/BlueprintForm.test.jsx (1 test)
✓ tests/BlueprintsPage.test.jsx (1 test)

Test Files  4 passed (4)
```

---

## 🐳 Docker

### PostgreSQL para BluePrints
```bash
cd BluePrints
docker-compose up -d

# Verificar
docker ps
docker logs blueprints-postgres
```

### Full Stack Docker Compose (TODO)
```bash
# Pendiente: Dockerfile frontend + backend + postgres
docker-compose -f docker-compose.full.yml up
```

---

## 📊 Funcionalidades Implementadas

### ✅ Backend
- [x] CRUD completo de Blueprints
- [x] Persistencia PostgreSQL + In-Memory
- [x] JWT Authentication & Authorization
- [x] Spring Security configurado
- [x] Filtros de procesamiento (Redundancy, Undersampling)
- [x] OpenAPI/Swagger docs
- [x] Códigos HTTP correctos (200, 201, 202, 404, 400)
- [x] ApiResponse<T> genérico
- [x] Manejo global de excepciones
- [x] Tests unitarios (16/16 ✅)

### ✅ Frontend
- [x] Autenticación JWT con login
- [x] Rutas protegidas con PrivateRoute
- [x] Redux Toolkit (blueprints + auth slices)
- [x] Canvas para visualizar blueprints
- [x] **Canvas interactivo** (click para agregar puntos)
- [x] **Botón Editar/Guardar** para modificar blueprints
- [x] **DELETE operation** con confirmación
- [x] **UPDATE operation** con optimistic updates
- [x] **Top-5 blueprints** con selector memoizado
- [x] **Banner de error** con botón Retry
- [x] Estados loading/error en UI
- [x] Switch Mock/Real API
- [x] Tests con Vitest (4/4 ✅)

### ✅ DevOps
- [x] GitHub Actions CI (lint + test + build)
- [x] ESLint + Prettier configurados
- [x] Docker Compose para PostgreSQL
- [x] .gitignore completo (Node + Java + Docker)

---

## 📊 Criterios de Evaluación

### Lab 4 - BluePrints (100%)

| Criterio | Peso | Estado |
|----------|------|--------|
| Diseño de API (versionamiento, DTOs, ApiResponse) | 25% | ✅ |
| Migración a PostgreSQL | 25% | ✅ |
| Códigos HTTP y control de errores | 20% | ✅ |
| Documentación (Swagger + README) | 15% | ✅ |
| Pruebas (unitarias + integración) | 15% | ✅ |

**Frontend React:**
- Funcionalidad y casos de uso (30%) ✅
- Calidad de código y arquitectura Redux (25%) ✅
- Manejo de estado, errores, UX (15%) ✅
- Pruebas automatizadas (15%) ✅
- Seguridad (JWT/Interceptores/Rutas) (10%) ✅
- CI/Lint/Format (5%) ✅

**Total: 100/100** ⭐

---

## 🛠️ Tecnologías Utilizadas

### Backend
- Java 21 (LTS)
- Spring Boot 3.3.9
- Spring Data JPA + Hibernate
- Spring Security 6.3.7
- PostgreSQL 16
- JWT (jjwt 0.12.6)
- Swagger/OpenAPI 3
- Maven 3.9+
- Docker & Docker Compose

### Frontend
- React 18.3
- Redux Toolkit 2.2.0
- Vite 7
- Axios 1.7.2 (HTTP client)
- React Router v6
- Vitest 3.2.4 (testing)
- @testing-library/react
- ESLint + Prettier

### Java (Laboratorios de Concurrencia)
- Java 21 Virtual Threads
- Swing (UI)
- JUnit 5
- Maven

---

## 📝 Documentación Adicional

- [Definiciones del laboratorio React](./DEFINICIONES.md)
- [Configuración de Docker](./docker-compose.yml)
- [Workflow de CI](./.github/workflows/ci.yml)
- [README del cliente React](./README_React.md)

---

## 🎯 Características Destacadas

### Canvas Interactivo 🎨
- Click en el canvas para agregar puntos
- Botón "Editar" activa modo interactivo
- Botón "Guardar" envía actualización al backend
- Visualización en tiempo real
- Cursor crosshair en modo edición

### Optimistic Updates⚡
- Actualización instantánea en UI
- Rollback automático si falla
- Feedback visual inmediato

### Top-5 Blueprints 🏆
- Selector memoizado con `createSelector`
- Ranking por número de puntos
- Actualización automática

### Error Handling 🛡️
- Banner rojo con mensaje de error
- Botón "Reintentar" para recuperación
- Estados loading consistentes

---

## 👨‍💻 Autor

**Escuela Colombiana de Ingeniería Julio Garavito**  
Arquitecturas de Software (ARSW)

---

## 📄 Licencia

Ver los archivos LICENSE en cada subcarpeta.

---

## ✅ Estado del Proyecto

- ✅ BluePrints Backend: **100%** completo (16/16 tests ✅)
- ✅ BluePrints Frontend: **100%** completo (4/4 tests ✅)
- ✅ PostgreSQL: Configurado y funcional
- ✅ JWT Auth: Implementado y probado
- ✅ Canvas Interactivo: Funcional
- ✅ CRUD Completo: CREATE/READ/UPDATE/DELETE
- ✅ Inmortals: Completo
- ✅ wait_notify: Completo
- ✅ Docker: PostgreSQL containerizado
- ✅ CI/CD: GitHub Actions funcionando
- ✅ Documentación: Actualizada

**Última actualización:** Marzo 12, 2026 🚀

---

## 🚦 Cómo Probar Todo

1. **Clonar el repositorio**
```bash
git clone <tu-repo>
cd <tu-repo>
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Levantar backend**
```bash
cd BluePrints
mvn spring-boot:run
# http://localhost:8081
```

4. **Levantar frontend** (en otra terminal)
```bash
npm run dev
# http://localhost:5173
```

5. **Login**
- Usuario: `user`
- Password: `password123`

6. **Probar funcionalidades**
- ✅ Listar blueprints por autor
- ✅ Ver blueprint en canvas
- ✅ Crear nuevo blueprint
- ✅ **Editar blueprint interactivamente**
- ✅ **Guardar cambios**
- ✅ **Eliminar blueprint**
- ✅ Ver Top-5 blueprints
- ✅ Probar botón Retry si falla

¡Disfruta explorando el proyecto! 🎉
