# Cat Breeds App

Una aplicación Angular moderna para explorar y descubrir información sobre diferentes razas de gatos. Desarrollada con Angular 18, siguiendo principios de Clean Architecture y SOLID, con diseño responsivo y estilo minimalista.

## 🚀 Características

### ✨ Funcionalidades Principales

- **Vista de Razas (Vista 1)**: Lista desplegable para seleccionar razas con carrusel de imágenes e información detallada
- **Búsqueda Avanzada (Vista 2)**: Filtro de texto para buscar razas por nombre, temperamento u origen
- **Sistema de Autenticación (Vista 3)**: Login con validación de credenciales
- **Registro de Usuarios (Vista 4)**: Formulario de registro con validaciones completas
- **Perfil de Usuario (Vista 5)**: Vista protegida que muestra información del usuario logueado

### 🏗️ Arquitectura y Buenas Prácticas

- **Clean Architecture**: Separación clara de capas (core, features, shared, layout)
- **Principios SOLID**: Implementación de interfaces, inyección de dependencias
- **Standalone Components**: Uso de componentes standalone de Angular 18
- **Lazy Loading**: Carga perezosa de módulos para mejor rendimiento
- **Reactive Forms**: Formularios reactivos con validaciones robustas
- **RxJS**: Manejo de estado reactivo y operaciones asíncronas
- **TypeScript**: Tipado fuerte para mayor seguridad y mantenibilidad

### 🎨 Diseño y UX

- **Diseño Responsivo**: Adaptable a dispositivos móviles, tablets y desktop
- **Estilo Minimalista**: Interfaz limpia y moderna con colores neutros
- **Componentes Reutilizables**: Carrusel, loading, layout components
- **Animaciones Suaves**: Transiciones CSS para mejor experiencia de usuario
- **Accesibilidad**: Etiquetas ARIA y navegación por teclado

### 🧪 Testing

- **Pruebas Unitarias**: Cobertura completa de servicios, componentes y guards
- **Mocking**: Uso de jasmine spies para aislar dependencias
- **Testing de Formularios**: Validación de reactive forms
- **Testing de HTTP**: Simulación de llamadas a APIs

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios centrales y configuración
│   │   ├── guards/             # Guards de autenticación
│   │   ├── interceptors/       # Interceptores HTTP
│   │   ├── models/             # Interfaces y tipos
│   │   └── services/           # Servicios de negocio
│   ├── features/               # Módulos de funcionalidades
│   │   ├── auth/              # Autenticación (login/register)
│   │   ├── cat-breeds/        # Gestión de razas de gatos
│   │   ├── home/              # Página de inicio
│   │   └── user-profile/      # Perfil de usuario
│   ├── layout/                # Componentes de layout
│   ├── shared/                # Componentes compartidos
│   │   └── components/        # Carousel, loading, etc.
│   ├── app.routes.ts          # Configuración de rutas
│   └── app.ts                 # Componente raíz
├── environments/              # Configuración de entornos
└── styles.scss               # Estilos globales
```

## 🛠️ Tecnologías Utilizadas

- **Angular 18**: Framework principal
- **TypeScript**: Lenguaje de programación
- **RxJS**: Programación reactiva
- **SCSS**: Preprocesador CSS
- **Jasmine/Karma**: Testing framework
- **Angular CLI**: Herramientas de desarrollo

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)
- Angular CLI (versión 18)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd cat-breeds-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Edita los archivos de configuración:

**src/environments/environment.ts** (desarrollo):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // URL de tu backend
  catApiUrl: 'https://api.thecatapi.com/v1',
  catApiKey: 'TU_API_KEY_AQUI' // Obtén tu API key en https://thecatapi.com/
};
```

**src/environments/environment.prod.ts** (producción):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-api-produccion.com/api',
  catApiUrl: 'https://api.thecatapi.com/v1',
  catApiKey: 'TU_API_KEY_PRODUCCION'
};
```

### 4. Obtener API Key de The Cat API

1. Visita [The Cat API](https://thecatapi.com/)
2. Regístrate para obtener una API key gratuita
3. Reemplaza `TU_API_KEY_AQUI` en los archivos de configuración

## 🏃‍♂️ Ejecutar la Aplicación

### Desarrollo

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

### Producción

```bash
npm run build
# o
ng build --configuration production
```

## 🧪 Ejecutar Pruebas

### Pruebas unitarias

```bash
npm test
# o
ng test
```

### Pruebas con cobertura

```bash
ng test --code-coverage
```

### Pruebas end-to-end

```bash
npm run e2e
# o
ng e2e
```

## 📱 Funcionalidades Detalladas

### Vista 1: Exploración de Razas

- **Lista desplegable**: Selección de razas disponibles
- **Carrusel de imágenes**: Navegación entre múltiples fotos de la raza
- **Información detallada**: Temperamento, peso, esperanza de vida, descripción
- **Tabla de razas**: Vista tabular con datos relevantes

### Vista 2: Búsqueda y Filtrado

- **Búsqueda en tiempo real**: Filtrado con debounce para mejor rendimiento
- **Múltiples criterios**: Busca por nombre, temperamento u origen
- **Resultados dinámicos**: Actualización inmediata de la tabla
- **Contador de resultados**: Muestra cantidad de coincidencias

### Vista 3: Sistema de Login

- **Validación de formularios**: Email válido y contraseña mínima
- **Manejo de errores**: Mensajes claros para el usuario
- **Estado de carga**: Indicadores visuales durante autenticación
- **Redirección automática**: Navegación post-login

### Vista 4: Registro de Usuarios

- **Formulario completo**: Nombre, apellido, usuario, email, contraseña
- **Validación de contraseñas**: Confirmación de contraseña coincidente
- **Mensajes de éxito**: Confirmación de registro exitoso
- **Navegación fluida**: Redirección automática al login

### Vista 5: Perfil de Usuario

- **Información personal**: Datos del usuario logueado
- **Vista protegida**: Acceso mediante guard de autenticación
- **Datos de cuenta**: Fechas de registro y actualización
- **Gestión de sesión**: Opción de cerrar sesión

## 🔒 Seguridad

- **Guards de autenticación**: Protección de rutas privadas
- **Interceptores HTTP**: Manejo automático de tokens
- **Validación de formularios**: Prevención de datos inválidos
- **Manejo de errores**: Respuestas seguras ante fallos

## 🎨 Personalización de Estilos

Los estilos siguen un enfoque minimalista con variables CSS personalizables:

```scss
// Colores principales
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
$danger-color: #dc3545;

// Espaciado
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 2rem;
```

## 📊 Performance

- **Lazy Loading**: Carga perezosa de componentes
- **OnPush Strategy**: Optimización de change detection
- **Debounce**: Búsqueda optimizada con retraso
- **Image Optimization**: Carga eficiente de imágenes
- **Bundle Splitting**: Separación de código para mejor caching

## 🌐 API Integration

### The Cat API

La aplicación consume datos de [The Cat API](https://thecatapi.com/):

- **GET /breeds**: Lista todas las razas disponibles
- **GET /breeds/{id}**: Obtiene detalles de una raza específica
- **GET /images/search**: Busca imágenes por raza
- **GET /breeds/search**: Busca razas por query

### Backend API (Requerido)

Para funcionalidad completa, necesitas un backend con endpoints:

```
POST /api/auth/login     - Autenticación de usuarios
POST /api/auth/register  - Registro de usuarios
GET  /api/user/profile   - Perfil del usuario
```

## 🚀 Despliegue

### Netlify/Vercel

```bash
npm run build
# Subir carpeta dist/ a tu plataforma preferida
```

### Docker

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/cat-breeds-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas Técnicas

### Principios SOLID Implementados

- **Single Responsibility**: Cada servicio tiene una responsabilidad específica
- **Open/Closed**: Servicios extensibles mediante interfaces
- **Liskov Substitution**: Implementaciones intercambiables de interfaces
- **Interface Segregation**: Interfaces específicas para cada necesidad
- **Dependency Inversion**: Inyección de dependencias en lugar de creación directa

### Clean Architecture

```
Presentation Layer (Components) → Application Layer (Services) → Domain Layer (Models)
```

### Patrones de Diseño

- **Observable Pattern**: RxJS para manejo de estado
- **Guard Pattern**: Protección de rutas
- **Interceptor Pattern**: Manejo de HTTP requests
- **Strategy Pattern**: Diferentes estrategias de validación

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de CORS**: Configura tu backend para permitir requests desde localhost:4200
2. **API Key inválida**: Verifica que la API key de The Cat API sea correcta
3. **Rutas no funcionan**: Asegúrate de que el servidor esté configurado para SPA

### Logs de Debug

```bash
# Habilitar logs detallados
ng serve --verbose
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [TuGitHub](https://github.com/tuusuario)

## 🙏 Agradecimientos

- [The Cat API](https://thecatapi.com/) por proporcionar datos de razas de gatos
- Comunidad Angular por las mejores prácticas
- Contribuidores de librerías open source utilizadas

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
