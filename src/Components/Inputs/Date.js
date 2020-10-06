import React from "react";
import InputError from "./InputErrors/InputErrors";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

/***
 * date input
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly errors?: *, readonly label?: *, readonly register?: *, readonly name?: *}> & React.RefAttributes<unknown>>}
 */
const Date = React.forwardRef(
  ({ label, name, errors, register, ...rest }, ref) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Controller
          name={name}
          render={({ onChange, onBlur, value }) => (
            <ReactDatePicker
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              dateFormat="dd-MM-yyyy"
              className="form-control"
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

export default Date;
