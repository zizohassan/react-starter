import RouteProvider from "../Providers/Routes/RouteProvider";

/**
 * get route path by name
 * @param name
 * @returns {*|undefined}
 * @constructor
 */
export const Route = (name , props) =>  {
  return RouteProvider.Route(name ,props)
};
