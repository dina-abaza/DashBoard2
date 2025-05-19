import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "email": "Email",
      "password": "Password",
      "language": "Language",
      "currency": "Currency",
      "dark_mode": "Dark Mode",
      "save": "Save Changes",
    },
  },
  ar: {
    translation: {
      "email": "البريد الإلكتروني",
      "password": "كلمة المرور",
      "language": "اللغة",
      "currency": "العملة",
      "dark_mode": "الوضع الليلي",
      "save": "حفظ التعديلات",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
