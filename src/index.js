import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Store from "./Context/Store";
import LanguagesProvider from "./Providers/Languages/LanguagesProvider";
import { LanguagesConfig } from "./Config/LanguagesConfig";
import "./Providers/Languages/TranslationProvider";
import LayoutProvider from "./Providers/Routes/LayoutProvider";
require("dotenv").config();


/**
 *
 * @returns {*}
 * @constructor
 */
const Index = () => (
  <Store>
      <App/>
  </Store>
);

/**
 * check if user not set language
 * 1- check if system allow to user get his browser data
 * 2 - check user browser data allow in supported language
 */
let languagesProvider = LanguagesProvider;
if (!languagesProvider.check(LanguagesConfig.localStorageKey)) {
  LanguagesProvider.setLanguageToStorage();
}
/**
 * check if there are no layout
 * set the default layout
 */
if(!LayoutProvider.getLayout()){
  LayoutProvider.setDefaultLayout()
}

ReactDOM.render(<Index/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
