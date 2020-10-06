import React, { useState, createContext } from "react";
import { Routes, Layout, Auth, Languages } from "./MainContext";

export const RoutesContext = createContext(Routes);
export const LayoutContext = createContext(Layout);
export const AuthContext = createContext(Auth);
export const LanguageContext = createContext(Languages);
export const ApiInputErrorContext = createContext([]);

/***
 * context for share data in hole application
 * you can add more than one context
 * @param children
 * @returns {*}
 * @constructor
 */
const Store = ({ children }) => {
  const [routes, setRoutes] = useState(Routes);
  const [layout, setLayout] = useState(Layout);
  const [auth, setAuth] = useState(Auth);
  const [language, setLanguage] = useState(Languages);
  const [inputError , setInputError] = useState([])

  return (
    <RoutesContext.Provider value={[routes, setRoutes]}>
      <LanguageContext.Provider value={[language, setLanguage]}>
        <LayoutContext.Provider value={[layout, setLayout]}>
          <AuthContext.Provider value={[auth, setAuth]}>
            <ApiInputErrorContext.Provider value={[inputError , setInputError]}>
              {children}
            </ApiInputErrorContext.Provider>
          </AuthContext.Provider>
        </LayoutContext.Provider>
      </LanguageContext.Provider>
    </RoutesContext.Provider>
  );
};

export default Store;
