declare module 'intl-pluralrules';

declare global {
  var ErrorUtils: {
    getGlobalHandler: () => ((error: Error, isFatal?: boolean) => void) | null;
    setGlobalHandler: (handler: (error: Error, isFatal?: boolean) => void) => void;
  };
}