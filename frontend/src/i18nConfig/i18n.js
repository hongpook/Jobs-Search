import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from './english';
import vie from './vietnamese';


i18n
  .use(initReactI18next) // Khởi tạo i18next cho React
  .init({
    fallbackLng: 'en', // Ngôn ngữ mặc định
    debug: true,
    interpolation: {
      escapeValue: false, // Không cần escape HTML
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

export default i18n;
