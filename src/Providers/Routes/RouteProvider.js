/***
 * handel Route on global
 */
import { Routes } from "Context/MainContext";
import LogProvider from "../Log/LogProvider";

class RouteProvider {
  ApiRoute(name,props) {
    try {
      return this.clearPathFromStaticParams(Routes.routes[name].path) + this.buildUrl(props);
    } catch (e) {
      LogProvider.logData("You try to call undefined route name " + name, "undefined route name");
    }
  }
  /***
   * get route path by name from array in config file
   * @param name
   * @returns {*}
   * @constructor
   */
  Route(name,props) {
    try {
      return this.clearPathFromStaticParams(Routes.routes[name].path) + this.buildUrl(props);
    } catch (e) {
      LogProvider.logData("You try to call undefined route name " + name, "undefined route name");
    }
  }

  /***
   * remove static params from path
   * like  :id :name
   * @param path
   * @returns {*|void|string}
   */
  clearPathFromStaticParams(path) {
    const searchRegExp = new RegExp("/:.*/?", "g"); // Throws SyntaxError
    return path.replace(searchRegExp, "");
  }

  /**
   * build query strings and params
   * to url
   * @param props
   * @returns {string}
   */
  buildUrl(props) {
    let returnUrl = "";
    if(props){
      Object.keys(props).forEach(function (objectKey) {
        returnUrl += objectKey === "query" ? this.appendQueryString(props[objectKey]) : "/" + props[objectKey]
      });
    }
    return returnUrl;
  }

  /**
   * get query object extract then
   * return with string url
   * @param object
   * @param key
   * @returns {string}
   */
  appendQueryString(object){
    let query = ''
    Object.keys(object).forEach((queryKey, index) => {
      query += index === 0 ? "?" : "&";
      query += queryKey + "=" + object[queryKey];
    });
    return query
  }
}

export default new RouteProvider();