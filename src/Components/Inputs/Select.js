import React from "react";
import InputError from "./InputErrors/InputErrors";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

/***
 * use react-form-hook controller to handel ref of react-select
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{errors?: *, label?: *, register?: *, name?: *}> & React.RefAttributes<any>>}
 */
const Select = React.forwardRef(
  ({ label, name, errors, register, options, ...rest }, ref) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Controller
          name={name}
          render={({ onChange, onBlur, value }) => (
            <ReactSelect
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              options={options}
            />
          )}
          {...rest}
        />
        <InputError
          name={name}
          label={label}
          errors={errors}
        />
      </div>
    );
  }
);
export default Select;
