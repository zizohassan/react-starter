/**
 * handel logs
 */
class LocalStoragesProviders {

  /***
   * set value to localstorage
   * if is json === true stringify data
   * @param key
   * @param data
   * @param isJson
   */
  set(key, data, isJson) {
    if (isJson !== undefined && isJson === true) {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  /***
   * get data from localstroage
   * parse data json in case isJson is true
   * @param key
   * @param isJson
   * @returns {string|any}
   */
  get(key, isJson) {
    let data = localStorage.getItem(key);
    if (data) {
      return (isJson !== undefined && isJson === true) ? JSON.parse(data) : data;
    }
    return false;
  }

  /**
   * check if this key exists in localstorage
   * @param key
   * @returns {boolean}
   */
  check(key) {
    return localStorage.getItem(key) !== null;
  }

  /**
   * delete key from storage
   * @param key
   */
  remove(key) {
    localStorage.removeItem(key);
  }

}

export default LocalStoragesProviders;
