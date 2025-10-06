Solución al error: Cannot use JSX unless the '--jsx' flag is provided

    Go to the command palette CTRL+Shift+P (Or ⌘+Shift+P on Mac).
    Choose "TypeScript: Select a TypeScript Version...".
    Choose "Use workspace Version".


Para iniciar la aplicación: 
  
    (Se requiere tener un emulador de celular previamente instalado, en mi caso Pixel 6)
    npm start

Solucion a:
    ERROR  node_modules\expo\AppEntry.js: [BABEL]: Cannot find module 'react-native-worklets/plugin'
                                                                                                                                            
    npm instal react-native-worklets-core  
    Y luego sin hacer fix, hay que utilizar npm run android   

