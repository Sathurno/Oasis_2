// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Configuración de traducciones en línea
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      language: "Language",
      select_language: "Select language",
      login: "Login",
      register: "Register",
      skip: "Skip",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      language: "Idioma",
      select_language: "Selecciona el idioma",
      login: "Iniciar sesión",
      register: "Registrarse",
      skip: "Saltar",
    },
  },
  de: {
    translation: {
      welcome: "Willkommen",
      language: "Sprache",
      select_language: "Sprache wählen",
      login: "Anmelden",
      register: "Registrieren",
      skip: "Überspringen",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // idioma predeterminado
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React ya se encarga de la seguridad
  },
  pluralSeparator: "_",
  keySeparator: false,
  nsSeparator: false,
  pluralResolver: "compatibility", // Usa 'compatibility' o 'v3' según tus necesidades
});

export default i18n;
