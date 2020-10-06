import React from "react";
import { ErrorsConfig } from "Config/ErrorsConfig";

/***
 * handel logic error from back end
 * example : your email or password not valid
 * @returns {*}
 * @constructor
 */
const ApiErrors = (props) => {
  console.log()
  return props.error !== undefined  && Object.keys(props.error).length > 0 && props.error.message !== "" ? (
    <div
      className={ErrorsConfig.apiErrorClassName}
      style={ErrorsConfig.apiErrorStyle}
    >
      {props.error.message}
    </div>
  ) : (
    ""
  );
};

export default ApiErrors;
