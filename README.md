# 🌱 Plataforma Web para la Difusión de Emprendimientos Locales - Frontend

Este repositorio contiene el código fuente del frontend de una plataforma web desarrollada con **React**, **TypeScript** y **Vite**, orientada a la promoción de productos agropecuarios con valor agregado en el Perú. La aplicación permite a los usuarios explorar emprendimientos locales, valorar productos y, en caso de ser productores, registrar sus iniciativas para darles visibilidad digital.

## 🚀 Tecnologías principales

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/) – Librería de componentes accesibles
- [TanStack React Query](https://tanstack.com/query/latest) – Manejo de estados del servidor
- [Axios](https://axios-http.com/) – Cliente HTTP
- [Zod](https://zod.dev/) – Validación y tipado de datos
- [React Hook Form](https://react-hook-form.com/) – Manejo eficiente de formularios
- [Lucide React](https://lucide.dev/) – Iconografía moderna
- [React Router DOM](https://reactrouter.com/) – Ruteo y navegación
- ESLint + Prettier – Estilo de código y formateo automático

## 📦 Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables
├── features/       # Funcionalidades agrupadas por dominio
├── pages/          # Vistas principales
├── services/       # Clientes API y configuración de React Query
├── lib/            # Utilidades generales
├── theme/          # Configuración de Chakra UI
└── main.tsx        # Punto de entrada
```

## 🛠 Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/GeraldAC/ds-frontend.git
cd ds-frontend
```

### 2. Instalar dependencias

```bash
npm install
# o con yarn
yarn install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Iniciar la aplicación

```bash
npm run dev
# o con yarn
yarn dev
```

Accede a la aplicación en: [http://localhost:5173](http://localhost:5173)

## ✅ Funcionalidades principales

- Autenticación de usuarios
- Visualización de productos y emprendimientos
- Valoraciones y comentarios
- Panel de usuario con edición de perfil
- Conversión de usuario a productor
- Gestión de productos y emprendimientos (CRUD)

## 📂 Repositorio Backend

El código del backend se encuentra en el siguiente repositorio:

🔗 `ds-backend`

## 🧪 Herramientas de desarrollo

- Hot Module Replacement (HMR)
- Linter y formateo automático con ESLint y Prettier
- Validaciones en frontend y backend con Zod
- Tipado estricto con TypeScript

## 📄 Licencia

Este proyecto ha sido desarrollado como parte de la asignatura _Desarrollo de Software I_.

**Licencia**: MIT — puedes usar y modificar libremente con fines académicos o personales.

✨ ¡Contribuciones y feedback son bienvenidos!
