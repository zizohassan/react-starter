import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Ar } from "Translations/Ar/Ar";
import { En } from "Translations/En/En";
import { OtherAr } from "Translations/Ar/Other";
import { OtherEn } from "Translations/En/Other";
import LanguagesProvider from "./LanguagesProvider";
//PLOP_IMPORT_INJECT

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: { translation: {...En , ...OtherEn} },
  ar: { translation: {...Ar , ...OtherAr} },
  //PLOP_CODE_INJECT
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: LanguagesProvider.getLanguage(),

    keySeparator: true, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;








