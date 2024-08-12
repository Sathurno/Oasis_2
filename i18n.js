import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Configuración de traducciones en línea
const resources = {
  en: {
    translation: {
      welcome: "Oasis",
      language: "Language",
      select_language: "Select language",
      login: "Login",
      register: "Register",
      skip: "Skip",
      "Hello Again!": "Hello Again!",
      enter_email: "Enter Email",
      enter_password: "Enter Password",
      forgot_password: "Forgot Password?",
      sign_in: "Sign In",
      or_continue_with: "Or continue with",
      no_account: "Don't have an account?",
      register_here: "Register here",
    },
  },
  es: {
    translation: {
      welcome: "Oasis",
      language: "Idioma",
      select_language: "Selecciona el idioma",
      login: "Iniciar sesión",
      register: "Registrarse",
      skip: "Saltar",
      "Hello Again!": "¡Hola Denuevo!",
      enter_email: "Ingresar Email",
      enter_password: "Ingresar Contraseña",
      forgot_password: "¿Recuperar Contraseña?",
      sign_in: "Iniciar Sesión",
      or_continue_with: "O continúa con",
      no_account: "¿No tienes una cuenta?",
      register_here: "Regístrate aquí",
    },
  },
  de: {
    translation: {
      welcome: "Oase",
      language: "Sprache",
      select_language: "Sprache wählen",
      login: "Anmelden",
      register: "Registrieren",
      skip: "Überspringen",
      "Hello Again!": "Hallo Wieder!",
      enter_email: "E-Mail eingeben",
      enter_password: "Passwort eingeben",
      forgot_password: "Passwort vergessen?",
      sign_in: "Anmelden",
      or_continue_with: "Oder weiter mit",
      no_account: "Noch kein Konto?",
      register_here: "Hier registrieren",
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
