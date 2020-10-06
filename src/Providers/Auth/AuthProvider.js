import { AuthConfig } from "Config/AuthConfig";
import LocalStoragesProviders from "Providers/LocalStoages/LocalStoragesProviders";

class AuthProvider extends LocalStoragesProviders {

  /**
   * set defualt values
   */
  constructor() {
    super()
    this.getStorageKey = AuthConfig.localStorage;
    this.getStorageTokenKey = AuthConfig.tokenLocalStorage;
  }

  /**
   * set data to local storage
   * @param {*} data
   */
  setLoginToStorage(data) {
    this.set(this.getStorageKey, data, true);
    this.set(this.getStorageTokenKey, data[AuthConfig.tokenAttr]);
  }

  /**
   * check if user have data in local storage or not
   */
  isAuth() {
    return this.check(this.getStorageKey);
  }

  /**
   * get user data from local storage if it avaliable
   */
  getCurrentUserData() {
    return this.get(this.getStorageKey , true);
  }

  /**
   * get user data from local storage if it available
   */
  getCurrentToken() {
    return this.get(this.getStorageTokenKey);
  }

  /***
   * remove user data and token from storage
   */
  clearStorage() {
    this.remove(this.getStorageKey)
    this.remove(this.getStorageTokenKey)
  }
}

export default new AuthProvider();
