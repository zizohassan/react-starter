import React  from "react";
import FrontEndErrors from "./FrontEndErrors";
import ApiInputErrors from "./ApiInputErrors";

/**
 * we handel here frontend input validation
 * and api input validation
 * we check error arrays that have input name
 * then show errors
 * note frontend error will show first then api errors
 * @param {*} props
 */
const InputError = (props) => {
  return (
    <>
      <FrontEndErrors {...props} />
      <ApiInputErrors {...props} />
    </>
  );
};

export default InputError;
