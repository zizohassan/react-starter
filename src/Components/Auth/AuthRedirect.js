import React from "react";
import { useTranslation } from "react-i18next";

/**
 * if auth user need to access not allow route
 * this component will render
 * @returns {*}
 * @constructor
 */
const AuthRedirect = () => {
  const [_trans] = useTranslation();

  return (
    <div className="text-center">
      <h1>{_trans('You Already login you can not access this page')} </h1>
    </div>
  );
};

export default AuthRedirect;
