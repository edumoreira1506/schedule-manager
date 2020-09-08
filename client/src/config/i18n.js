import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales';

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  resources,
});

export default i18n;
