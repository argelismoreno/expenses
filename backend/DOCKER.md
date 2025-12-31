# ExpenseFlow - Docker Setup

## 🐳 Ejecución Completa con Docker

### Opción 1: Desarrollo con Hot Reload (Recomendado para desarrollo)

Si quieres trabajar con hot reload y ver cambios en tiempo real:

```bash
# 1. Levantar solo la base de datos
docker-compose up -d db

# 2. Instalar dependencias localmente (solo primera vez)
npm install

# 3. Ejecutar backend en modo desarrollo
npm run start:dev
```

### Opción 2: Todo en Docker (Producción)

Si quieres todo containerizado sin Node.js local:

```bash
# Construir y levantar todos los servicios
docker-compose up --build

# O en modo detached (background)
docker-compose up --build -d
```

## 📋 Comandos Útiles

```bash
# Ver logs del backend
docker-compose logs -f backend

# Ver logs de la base de datos
docker-compose logs -f db

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (borra la BD)
docker-compose down -v

# Reconstruir solo el backend
docker-compose up --build backend

# Ver estado de los contenedores
docker-compose ps

# Ejecutar comandos dentro del contenedor
docker-compose exec backend npm run migration:run
```

## 🔧 Estructura Docker

- **Dockerfile**: Multi-stage build para optimizar tamaño de imagen
- **docker-compose.yml**: Orquestación de servicios (DB + Backend)
- **.dockerignore**: Excluye archivos innecesarios del build

## 🌐 Acceso a la Aplicación

Una vez levantado:
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Health Check**: http://localhost:3000/health

## ⚠️ Notas Importantes

1. **Primera ejecución**: El backend esperará a que PostgreSQL esté listo (healthcheck)
2. **Seeding**: Los usuarios admin y employee se crean automáticamente
3. **Variables de entorno**: Configuradas en docker-compose.yml
4. **Persistencia**: Los datos de PostgreSQL se guardan en un volumen Docker
