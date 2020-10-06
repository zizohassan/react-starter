import React from "react";
import InputError from "./InputErrors/InputErrors";

/***
 * password input
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly errors?: *, readonly label?: *, readonly register?: *, readonly name?: *}> & React.RefAttributes<unknown>>}
 */
const Password = React.forwardRef(
  ({ label, name, errors, register, ...rest }, ref) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="password"
        className="form-control"
        {...rest}
        name={name}
        ref={ref}
      />
      <InputError name={name} label={label} errors={errors} />
    </div>
  )
);

export default Password;
