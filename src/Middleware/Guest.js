import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthConfig } from "Config/AuthConfig";
import { AuthContext } from "Context/Store";


/***
 * if you are auth and need to access not allow route
 * will render default component from config auth file
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
export const Guest = ({ component: Component, ...rest }) => {
  const [auth] = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isAuth) {
          return <Component {...props} />;
        } else {
          return <AuthConfig.redirectAuthUser {...props} />;
        }
      }}
    />
  );
};
