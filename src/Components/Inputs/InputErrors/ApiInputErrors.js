import React, { useContext } from "react";
import { ErrorsConfig } from "Config/ErrorsConfig";
import { ApiInputErrorContext } from "Context/Store";

/***
 * handel error input coming from apis
 * @param props
 * @returns {*}
 * @constructor
 */
const ApiInputErrors = props => {
  const [inputError] = useContext(ApiInputErrorContext);

  return inputError !== undefined &&
    inputError &&
    inputError[props.name] !== undefined &&
    inputError[props.name].length > 0 && (
      <div
        className={ErrorsConfig.errorClassName}
        style={ErrorsConfig.errorStyle}
      >
        {inputError[props.name][0]}
      </div>
    );
};

export default ApiInputErrors;