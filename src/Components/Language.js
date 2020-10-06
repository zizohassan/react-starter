import React, { useContext } from "react";
import { LanguageContext } from "Context/Store";
import LanguagesProvider from "Providers/Languages/LanguagesProvider";
import { Languages } from "Context/MainContext";
import i18n from 'Providers/Languages/TranslationProvider';

/**
 * handel language menu
 * @param props
 * @returns {*[]}
 * @constructor
 */
const Language = props => {
  /// language from context
  const [language , setLanguage] = useContext(LanguageContext);
  /// change language in localstorage and on context
  const changeLanguage = (lang , e) => {
    e.preventDefault();
    LanguagesProvider.changeLanguage(lang.code)
    setLanguage(Languages)
    i18n.changeLanguage(lang.code);
  }

  return (Object.values(language.languageList).map((lang) =>
    lang.code !== language.lang && (<span  className="nav-link" key={lang.code} onClick={changeLanguage.bind(this , lang)} >{lang.label}</span>)
  ));
};

export default Language;