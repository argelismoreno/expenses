# ExpenseFlow Backend

Sistema de Gestión de Reembolsos - Backend API

## 📋 Descripción

ExpenseFlow es una plataforma centralizada para la gestión de gastos empresariales. Permite a los empleados cargar gastos y a los administradores aprobarlos o rechazarlos, aplicando reglas automáticas de validación según el tipo de gasto.

## 🛠️ Stack Tecnológico

### Core Technologies
- **Node.js**: v18.x o superior
- **NestJS**: v10.0.0 - Framework backend modular
- **TypeScript**: v5.1.3 - Lenguaje de programación
- **PostgreSQL**: v15 - Base de datos relacional

### Dependencias Principales
- **TypeORM**: v0.3.17 - ORM para PostgreSQL
- **Passport & JWT**: v10.1.0 - Autenticación y autorización
- **class-validator**: v0.14.0 - Validación de DTOs
- **bcrypt**: v5.1.1 - Encriptación de contraseñas

### Versiones
- **Backend**: v1.0.0

## 🏗️ Arquitectura y Patrones de Diseño

### Patrones Implementados

#### 1. Repository Pattern (Obligatorio)
Utilizado para todo el acceso a datos a través de TypeORM repositories:
- `UserRepository` (vía TypeORM)
- `ExpenseRepository` (vía TypeORM)

#### 2. Strategy Pattern (Obligatorio)
Implementado para manejar la lógica de validación variable según el tipo de gasto:

```
IExpenseValidationStrategy (Interface)
    ├── TravelValidationStrategy (Viáticos)
    ├── FoodValidationStrategy (Comida)
    ├── EquipmentValidationStrategy (Equipo)
    └── TrainingValidationStrategy (Capacitación)

ExpenseValidationContext (Context)
```

**Ubicación**: `src/expenses/strategies/`

#### 3. Custom Providers con useClass (Obligatorio)
Demostración de inyección de dependencias avanzada:
- `GlobalConfigService` - Configuración global usando `useClass`
- **Ubicación**: `src/config/configuration.module.ts`

### Estructura Modular

```
src/
├── auth/                    # Módulo de autenticación
│   ├── entities/           # User entity
│   ├── dto/                # DTOs de registro/login
│   ├── guards/             # JWT & Roles guards
│   ├── strategies/         # JWT strategy
│   └── decorators/         # Custom decorators
├── expenses/               # Módulo de gastos
│   ├── entities/          # Expense entity
│   ├── dto/               # DTOs de creación/actualización
│   ├── strategies/        # Strategy Pattern para validación
│   └── expenses.service.ts
├── config/                # Módulo de configuración
│   └── global-config.service.ts (Custom Provider)
└── common/                # Enums y utilidades compartidas
    └── enums/
```

## 📊 Reglas de Negocio

### Tipos de Gasto y Validaciones

| Tipo | Enum | Regla de Validación |
|------|------|---------------------|
| **Viáticos** | `TRAVEL` | Requiere justificación (pre-aprobación) |
| **Comida** | `FOOD` | Límite de $60 por día |
| **Equipo** | `EQUIPMENT` | Requiere justificación detallada |
| **Capacitación** | `TRAINING` | Máximo 2 capacitaciones por mes por empleado |

### Roles de Usuario

- **EMPLOYEE**: Puede crear gastos y ver sus propios gastos
- **ADMIN**: Puede aprobar/rechazar gastos y ver todos los gastos

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js v18+ instalado
- PostgreSQL v15+ instalado o Docker
- npm o yarn

### Paso 1: Clonar el repositorio

```bash
git clone <repository-url>
cd gastos
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=expenseflow

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=24h

# Application
PORT=3000
NODE_ENV=development
```

### Paso 4: Iniciar base de datos con Docker

```bash
docker-compose up -d
```

Esto iniciará PostgreSQL en el puerto 5432.

### Paso 5: Ejecutar la aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

La aplicación estará disponible en: `http://localhost:3000`

## 👥 Usuarios de Prueba (Seeding)

Al iniciar la aplicación, el sistema verifica si existen usuarios. Si no existen, se crean automáticamente (via `onModuleInit` en `AuthService`) los siguientes usuarios de prueba:

### Administrador
- **Email**: `admin@expenseflow.com`
- **Password**: `admin123`
- **Role**: `ADMIN`

### Empleado
- **Email**: `employee@expenseflow.com`
- **Password**: `employee123`
- **Role**: `EMPLOYEE`

## 📡 API Endpoints

### Autenticación

#### POST `/auth/register`
Registrar nuevo usuario (por defecto rol EMPLOYEE)

**Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST `/auth/login`
Iniciar sesión

**Body**:
```json
{
  "email": "employee@expenseflow.com",
  "password": "employee123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "employee@expenseflow.com",
    "firstName": "Employee",
    "lastName": "User",
    "role": "employee"
  },
  "token": "jwt-token"
}
```

### Gastos (Requiere autenticación)

**Headers**: `Authorization: Bearer <token>`

#### POST `/expenses`
Crear nuevo gasto (EMPLOYEE, ADMIN)

**Body**:
```json
{
  "amount": 45.50,
  "description": "Almuerzo con cliente",
  "date": "2024-01-15",
  "type": "food",
  "justification": "Reunión importante con cliente potencial"
}
```

#### GET `/expenses/my-expenses?page=1&limit=10`
Ver mis gastos (EMPLOYEE, ADMIN)

#### GET `/expenses/pending`
Ver gastos pendientes (ADMIN)

#### GET `/expenses?page=1&limit=10`
Ver todos los gastos (ADMIN)

#### GET `/expenses/:id`
Ver detalle de un gasto (EMPLOYEE, ADMIN)

#### PATCH `/expenses/:id/status`
Aprobar/Rechazar gasto (ADMIN)

**Body**:
```json
{
  "status": "approved",
  "rejectionReason": "Opcional si es rejected"
}
```

#### GET `/expenses/total/:year/:month`
Ver total gastado por mes (ADMIN)

**Ejemplo**: `/expenses/total/2024/1`

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔧 Scripts Disponibles

```bash
npm run start          # Iniciar aplicación
npm run start:dev      # Modo desarrollo con watch
npm run start:debug    # Modo debug
npm run build          # Compilar para producción
npm run lint           # Ejecutar linter
npm run format         # Formatear código con Prettier
```

## 🗄️ Migraciones (Opcional)

```bash
# Generar migración
npm run migration:generate -- src/migrations/MigrationName

# Ejecutar migraciones
npm run migration:run

# Revertir migración
npm run migration:revert
```

## 📝 Notas Técnicas

### Validación Automática
- Todas las validaciones se ejecutan automáticamente usando el **Strategy Pattern**
- Las reglas de negocio están encapsuladas en estrategias específicas
- El contexto selecciona la estrategia correcta según el tipo de gasto

### Seguridad
- Contraseñas encriptadas con bcrypt (10 rounds)
- Autenticación JWT con expiración configurable
- Guards de roles para proteger endpoints
- Validación de DTOs con class-validator

### Base de Datos
- TypeORM con sincronización automática en desarrollo (`synchronize: true`)
- **IMPORTANTE**: En producción usar migraciones (`synchronize: false`)
- Relaciones: User 1:N Expense

## 🐳 Docker

El proyecto incluye `docker-compose.yml` para la base de datos:

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f
```

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado como prueba técnica para ExpenseFlow
