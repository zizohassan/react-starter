import LocalStoragesProviders from "Providers/LocalStoages/LocalStoragesProviders";
import { LanguagesConfig } from "Config/LanguagesConfig";

/**
 * handel Languages
 */
class LanguagesProvider extends LocalStoragesProviders {

  /**
   * set default values
   */
  constructor() {
    super();
    this.browserLanguage = window.navigator.userLanguage || window.navigator.language;
    this.language = null;
    this.defaulLanguage = LanguagesConfig.defaultLanguage;
    this.overWriteBrowserLanguage = LanguagesConfig.overwriteUserBrowserLanguage;
    this.storageKey = LanguagesConfig.localStorageKey;
    this.languageList = LanguagesConfig.languageList;
    this.langObjectKey = LanguagesConfig.localStorageLangObjecteKey;
  }

  /***
   * check if we must set default language or
   * we set browser language
   * @returns {string}
   */
  decideWhatLanguageWillUse() {
    let lang = this.defaulLanguage;
    this.setBrowserLanguage();
    if (this.getLanguageObject(this.browserLanguage)) {
      lang = this.browserLanguage;
    }
    if (this.overWriteBrowserLanguage) {
      lang = this.defaulLanguage
    }
    return {lang: lang, langObject: this.getLanguageObject(lang)};
  }

  /**
   * get browser language
   * @returns {string}
   */
  setBrowserLanguage() {
    let language = "";
    if (this.browserLanguage.includes("-")) {
      language = this.browserLanguage.split("-");
      if (language[0]) {
        this.browserLanguage = language[0];
      }
    }
    return this.browserLanguage;
  }

  /***
   * set language to localstorage
   */
  setLanguageToStorage() {
    let language = this.decideWhatLanguageWillUse();
    this.set(this.storageKey, language.lang);
    this.set(this.langObjectKey , language.langObject , true)
  }

  /***
   * change language
   * @param lang
   */
  changeLanguage(lang) {
    this.set(this.storageKey, lang);
    this.set(this.langObjectKey , this.getLanguageObject(lang) , true)
  }

  /***
   * return language from localStorage
   * @param lang
   */
  getLanguage() {
   return this.get(this.storageKey);
  }

  /***
   * return language object from localStorage
   * @param lang
   */
  getLanguageObjectFromStorage() {
    return this.get(this.langObjectKey , true);
  }

  /**
   * check if user lanuage supported by system
   * @returns {boolean}
   */
  getLanguageObject(lang) {
    return this.languageList[lang];
  }

}

export default new LanguagesProvider();
