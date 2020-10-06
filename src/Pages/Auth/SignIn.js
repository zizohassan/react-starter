import React, { useContext, useEffect } from "react";
import { AuthConfig } from "Config/AuthConfig";
import { useForm } from "react-hook-form";
import Email from "Components/Inputs/Email";
import Password from "Components/Inputs/Password";
import { EmailValidation, PasswordValidation } from "Utils/Validation";
import ApiErrors from "Components/ApiErrors";
import Loading from "Components/Loading";
import { Link } from "react-router-dom";
import { AuthContext } from "Context/Store";
import AuthProvider from "Providers/Auth/AuthProvider";
import History from "Utils/History";
import { useTranslation } from 'react-i18next';
import { Route } from "Utils/Route";
import useActions from "Hooks/useActions";
import { ApiRoute } from "./Actions/ApiRoute";

const SignIn = () => {
  /// form binding and front end errors handling
  const { register, handleSubmit, errors } = useForm();
  /// set auth user on context
  const [ , setAuth] = useContext(AuthContext);
  /// translation
  const [_trans] = useTranslation();
  /// use actions hook
  const {loading, error, response , post} = useActions({});

  /// fire login action
  const onSubmit = (data) => {
    post({url: ApiRoute("apiSignIn"), data :data , method : "post"})
  };

  /// if response done redirect
  useEffect(() => {
    if(response.status){
      setAuth({ isAuth: true, user: response.data, token: response.data[AuthConfig.tokenAttr]});
      AuthProvider.setLoginToStorage(response.data);
      History.push(AuthConfig.redirectAfterSignIn)
    }
  } , [response , setAuth])

  return (
    <div className="relative">
      <h1>{_trans('sign-in')}</h1>
      {/*loading component*/}
      <Loading loading={loading}/>
      {/*handel logic api errors*/}
      <ApiErrors error={error}/>
      {/*handel from by custom inputs*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Email
          name="email"
          label={_trans('email-address')}
          errors={errors}
          placeholder={_trans('email-address')}
          ref={register(EmailValidation)}
        />
        <Password
          name="password"
          label={_trans('password')}
          errors={errors}
          placeholder={_trans('password')}
          ref={register(PasswordValidation)}
        />
        <button type="submit" className="btn btn-success mr-3">
          {_trans('sign-in')}
        </button>
        <Link to={Route('signUp')} className="btn btn-success "> {_trans('sign-up')}</Link>
      </form>
    </div>
  );
};

export default SignIn;
