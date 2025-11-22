# Oasis

Aplicación móvil desarrollada en React Native con Expo para la gestión y alquiler de baterías.

## Descripción

Oasis permite a los usuarios buscar, alquilar y devolver baterías. La aplicación incluye funcionalidades para el seguimiento del estado de la batería (carga restante, costo acumulado, tiempo de uso), gestión de perfil de usuario y visualización de elementos 3D.

## Componentes Principales

La aplicación está construida utilizando una arquitectura basada en componentes. Algunos de los componentes clave incluyen:

*   **BatteryButtons.tsx**: Botones de acción para la gestión de baterías (ej. devolver).
*   **BatteryInfo.tsx**: Muestra información detallada de la batería alquilada (carga, costo, tiempo).
*   **Earth.tsx / Earth2.tsx**: Componentes de visualización 3D (posiblemente utilizando React Three Fiber).
*   **Header.tsx / HeaderSection.tsx**: Componentes de cabecera y navegación superior.
*   **MicroMenu.tsx**: Menú de navegación rápida o contextual.
*   **ThemedText.tsx**: Componente de texto estilizado para mantener la consistencia visual.

## Requisitos Previos

*   Node.js instalado.
*   Emulador de Android/iOS o dispositivo físico con Expo Go.

## Instalación

1.  Clonar el repositorio.
2.  Instalar las dependencias:

    ```bash
    npm install
    ```

## Ejecución

Para iniciar la aplicación en modo de desarrollo:

```bash
npm start
```

O para ejecutar directamente en una plataforma específica:

*   **Android**: `npm run android`
*   **iOS**: `npm run ios`
*   **Web**: `npm run web`

> **Nota**: Se requiere tener un emulador previamente instalado (ej. Pixel 6) o un dispositivo físico conectado.

## Solución de Problemas

### Error: Cannot use JSX unless the '--jsx' flag is provided

1.  Abrir la paleta de comandos: `CTRL+Shift+P` (o `⌘+Shift+P` en Mac).
2.  Seleccionar "TypeScript: Select a TypeScript Version...".
3.  Elegir "Use workspace Version".

### Error: [BABEL]: Cannot find module 'react-native-worklets/plugin'

Si encuentras este error en `node_modules\expo\AppEntry.js`:

1.  Instalar el paquete faltante:
    ```bash
    npm install react-native-worklets-core
    ```
2.  Ejecutar la aplicación nuevamente (sin hacer fix automático si se sugiere):
    ```bash
    npm run android
    ```