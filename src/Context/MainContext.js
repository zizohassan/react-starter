import { AuthRouteList } from "Routes/Auth";
import { GuestOnlyRouteList, GuestRouteList } from "Routes/Guest";
import { LayoutConfig } from "Config/LayoutConfig";
import AuthProvider from "Providers/Auth/AuthProvider";
import LanguagesProvider from "Providers/Languages/LanguagesProvider";
import { LanguagesConfig } from "Config/LanguagesConfig";
import LayoutProvider from "../Providers/Routes/LayoutProvider";

/**
 * get all routes on one array
 * @type {{routes: *[]}}
 */
export const Routes = {
  routes: {...AuthRouteList, ...GuestOnlyRouteList, ...GuestRouteList}
};

/**
 * get default layout
 * @type {{layout: (function(): *)}}
 */
export const Layout = {
  layout: LayoutConfig.default,
  name: LayoutProvider.getLayout()
};

/**
 * handel auth user from context
 * @type {{isAuth: boolean, user: (function(): *)}}
 */
export const Auth = {
  user: AuthProvider.getCurrentUserData(),
  isAuth: AuthProvider.isAuth(),
  token: AuthProvider.getCurrentToken()
};

/**
 * get language
 * @type {{lang: void}}
 */
export const Languages = () => {
  return {
    lang: LanguagesProvider.getLanguage(),
    langObject: LanguagesProvider.getLanguageObjectFromStorage(),
    languageList: LanguagesConfig.languageList
  };
};

