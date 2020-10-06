/***
 * handel api errors
 * these error will set with api response
 */

class ApiErrorsProvider {
  /**
   * parse response on constructor
   * @param response
   */
  constructor(response) {
    this.response = response;
  }

  /***
   * if there error message show it
   * @returns {*}
   */
  renderErrors() {
    if (!this.response.status) {
      return this.response.message;
    }
  }
}

export default ApiErrorsProvider;
