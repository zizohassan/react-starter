import FrontEndErrorsProvider from "Providers/Errors/FrontEndErrorsProvider";
import { ErrorsConfig } from "Config/ErrorsConfig";
import React from "react";

/***
 * handel front end validation messages
 * @param props
 * @returns {boolean|*}
 * @constructor
 */
const FrontEndErrors = props => {
  const error = new FrontEndErrorsProvider(
    props.name,
    props.label,
    props.errors
  ).checkInputType();

  return error !== undefined && (
    <div
      className={ErrorsConfig.errorClassName}
      style={ErrorsConfig.errorStyle}
    >
      {error}
    </div>
  );
};

export default FrontEndErrors;