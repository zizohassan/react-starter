import React, { useContext, useEffect } from "react";
import { AuthConfig } from "Config/AuthConfig";
import { useForm } from "react-hook-form";
import Email from "Components/Inputs/Email";
import Password from "Components/Inputs/Password";
import ApiErrors from "Components/ApiErrors";
import Loading from "Components/Loading";
import Text from "Components/Inputs/Text";
import Select from "Components/Inputs/Select";
import { Gender } from "Utils/SelectArrays";
import Date from "Components/Inputs/Date";
import { Link } from "react-router-dom";
import { AuthContext } from "Context/Store";
import AuthProvider from "Providers/Auth/AuthProvider";
import History from "Utils/History";
import { useTranslation } from "react-i18next";
import {
  EmailValidation,
  PasswordValidation,
  PhoneNumberValidation,
  RequiredMinMAx, RequiredOnly
} from "Utils/Validation";
import { Route } from "Utils/Route";
import { ApiRoute } from "./Actions/ApiRoute";
import useActions from "Hooks/useActions";
import { SignUpTransformer } from "./Transformers/SignUp";


const SignUp = () => {
  /// form binding and front end errors handling
  const { register, handleSubmit, watch, errors, control } = useForm();
  /// set auth user on context
  const [, setAuth] = useContext(AuthContext);
  /// translation
  const [_trans] = useTranslation();
  /// use actions hook
  const { loading, error, response, post } = useActions({});

  /// fire sign up action
  const onSubmit = (data) => {
    let options = { url: ApiRoute("apiSignUp"), data: SignUpTransformer(data), method: "post" };
    post(options);
  };

  /// if response done redirect
  useEffect(() => {
    if (response.status) {
      setAuth({ isAuth: true, user: response.data, token: response.data[AuthConfig.tokenAttr] });
      AuthProvider.setLoginToStorage(response.data);
      History.push(AuthConfig.redirectAfterSignUp);
    }
  }, [response , setAuth]);

  return (
    <div className="relative">
      <h1>{_trans("sign-up")}</h1>
      {/*loading component*/}
      <Loading loading={loading}/>
      {/*handel logic api errors*/}
      <ApiErrors error={error}/>
      {/*handel from by custom inputs*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text
          name="first_name"
          label={_trans("first-name")}
          errors={errors}
          placeholder={_trans("first-name")}
          ref={register(RequiredMinMAx(_trans("first-name"), 2, 30))}
        />
        <Text
          name="middle_name"
          label={_trans("middle-name")}
          errors={errors}
          placeholder={_trans("middle-name")}
          ref={register(RequiredMinMAx(_trans("middle-name"), 2, 30))}
        />
        <Text
          name="last_name"
          label={_trans("last-name")}
          errors={errors}
          placeholder={_trans("last-name")}
          ref={register(RequiredMinMAx(_trans("last-name"), 2, 30))}
        />
        <Select
          name="gender"
          label={_trans("gender")}
          errors={errors}
          placeholder={_trans("gender")}
          control={control}
          options={Gender}
          rules={RequiredOnly(_trans("gender"))}
        />
        <Date
          name="birth_date"
          label={_trans("birth-date")}
          errors={errors}
          placeholder={_trans("birth-date")}
          control={control}
          rules={RequiredOnly(_trans("birth-date"))}
        />
        <Text
          name="phone"
          label={_trans("phone")}
          errors={errors}
          placeholder={_trans("phone")}
          ref={register(PhoneNumberValidation)}
        />
        <Email
          name="email"
          label={_trans("email-address")}
          errors={errors}
          placeholder={_trans("email-address")}
          ref={register(EmailValidation)}
        />
        <Password
          name="password"
          label={_trans("password")}
          errors={errors}
          placeholder={_trans("password")}
          ref={register(PasswordValidation)}
        />
        <Password
          name="password_confirmation"
          label={_trans("password-confirmation")}
          errors={errors}
          placeholder={_trans("password-confirmation")}
          ref={register({
            validate: (value) =>
              value === watch("password") || _trans("Passwords don not match")
          })}
        />
        <button type="submit" className="btn btn-success mr-3">
          {_trans("sign-up")}
        </button>
        <Link to={Route("signIn")} className="btn btn-success "> {_trans("sign-in")} </Link>
      </form>
    </div>
  );
};

export default SignUp;
