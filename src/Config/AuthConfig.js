import GuestRedirect from "Components/Auth/GuestRedirect";
import AuthRedirect from "Components/Auth/AuthRedirect";

/**
 * config file for auth
 */
export const AuthConfig = {
  /**
   * use this key to save data in localstorage
   */
  localStorage: "user",
  /**
   * use this key to save data in localstorage
   */
  tokenLocalStorage: "token",
  /**
   * token attr from login response
   */
  tokenAttr : "api_token",
  /**
   * if guest hit auth url system will automatic
   * load this component
   */
  redirectNotAuthUser: GuestRedirect,
  /**
   * if auth user try to hit not allow url
   */
  redirectAuthUser: AuthRedirect,
  /**
   * logout redirect
   */
  redirectAfterLogOut: "/",
  /**
   * login redirect
   */
  redirectAfterSignIn: "/app",
  /**
   * sign up redirect
   */
  redirectAfterSignUp: "/app",
  /**
   * use Bearer token
   */
  userBearerToken: true

};
