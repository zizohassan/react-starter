import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Route } from "Utils/Route";

/***
 * if not auth user need to access
 * auth pages
 * @returns {*}
 * @constructor
 */
const GuestRedirect = () => {
  const [_trans] = useTranslation();

  return (
    <div className="text-center">
      <h1>{_trans('You are not login')} </h1>
      <p>{_trans('You must login or sign up')} </p>
      <Link to={Route("signIn")}>{_trans('Login')}</Link>
      <Link to={Route("signUp")}>{_trans('sign up')}</Link>
    </div>
  );
};

export default GuestRedirect;
