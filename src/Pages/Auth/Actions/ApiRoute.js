/***
 * api routes with name this will make
 * easy to manipulate urls
 * @param key
 * @returns {*}
 * @constructor
 */
export const ApiRoute = (key) =>  {
  let prefix = ''

  let routes = {
    apiSignIn : `${prefix}login`,
    apiSignUp : `${prefix}website-users/register-personal`,
  }

  return routes[key];
}