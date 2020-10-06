import React, { useContext, useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { AuthRouteList } from "Routes/Auth";
import { GuestRouteList, GuestOnlyRouteList } from "Routes/Guest";
import { Auth } from "Middleware/Auth.js";
import { Guest } from "Middleware/Guest";
import { LayoutContext, RoutesContext } from "Context/Store";
import { LayoutConfig } from "Config/LayoutConfig";
import LayoutProvider from "./LayoutProvider";

/***
 * user page Views is responsible for
 * track user routes and load what ever layout out he parse in
 * route files (so if you need to set layout for specific route add layout attr in route file)
 */
function usePageViews() {
  const [, setLayout] = useContext(LayoutContext);
  const [routes] = useContext(RoutesContext);
  let location = useLocation();

  useEffect(
    () => {
      let name = LayoutConfig.default.defaultProps.name;
        Object.keys(routes.routes).map((key) => {
          if (routes.routes[key].path === location.pathname) {
            if (routes.routes[key].layout === undefined) {
              setLayout({ layout: LayoutConfig.default , name  : name });
              LayoutProvider.setLayoutName(name)
            } else {
              name = routes.routes[key].layout.defaultProps.name;
              setLayout({ layout: routes.routes[key].layout  , name : name});
              LayoutProvider.setLayoutName(name)
            }
          }
          return name
        }
      );
    }, [location, setLayout , routes]);
}

/**
 * here we care about render component from routes folder
 * we take component name and render it
 * if route not found with automatic load 404 component
 **/
const RouterBodyProvider = () => {
  usePageViews();

  return (
    <Switch>
      {Object.keys(AuthRouteList).map((key) => (
        <Auth
          exact
          path={AuthRouteList[key].path}
          key={`auth_` + key}
          component={AuthRouteList[key].component}
        />
      ))}
        {Object.keys(GuestOnlyRouteList).map((key) => (
        <Guest
          exact
          path={GuestOnlyRouteList[key].path}
          key={`guest_` + key}
          component={GuestOnlyRouteList[key].component}
        />
      ))}
      {Object.keys(GuestRouteList).map((key) => (
        <Route
          exact
          path={GuestRouteList[key].path}
          key={`guest_only_` + key}
          component={GuestRouteList[key].component}
        />
      ))}
      <Redirect to="/404"/>
    </Switch>
  );
};

export default RouterBodyProvider;
