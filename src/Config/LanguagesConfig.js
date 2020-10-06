/*
 * config file for Languages
 */
export const LanguagesConfig = {
  /**
   *  available languages
   */
  languageList: {
    ar: { label: "Arabic", code: "ar", dir: "rtl" },
    en: { label: "English", code: "en", dir: "ltr" },
    //PLOP_IMPORT_INJECT
  },
  /**
   * defualt language of system
   */
  defaultLanguage: "ar",
  /**
   * if true all users will have the same init language
   * if false users will get the same browser language
   */
  overwriteUserBrowserLanguage: false,
  /**
   * storage key
   */
  localStorageKey: "lang",
  /**
   * storage key
   */
  localStorageLangObjecteKey: "lang_object",
};











