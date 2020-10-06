import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthConfig } from "Config/AuthConfig";
import { AuthContext } from "Context/Store";

/**
 * if user auth will render component
 * if not auth will render auth config component
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
export const Auth = ({ component: Component, ...rest }) => {
  const [auth] = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuth) {
          return <Component {...props} />;
        } else {
          return <AuthConfig.redirectNotAuthUser {...props} />;
        }
      }}
    />
  );
};
