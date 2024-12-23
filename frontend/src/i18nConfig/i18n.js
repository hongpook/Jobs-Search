import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from './english';
import vie from './vietnamese';

const savedLanguage = localStorage.getItem('language') || 'vi';

i18n
  .use(initReactI18next) 
  .init({
    lng: savedLanguage, 
    fallbackLng: 'vi', 
    debug: true,
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: eng,
      },
      vi: {
        translation: vie,
      },
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
