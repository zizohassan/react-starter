/***
 * handel front end errors
 * these error will set with react-hook-form
 */

class FrontEndErrorsProvider {
  /***
   *  get what we need to run this class
   * @param name
   * @param label
   * @param errors
   */
  constructor(name, label, errors) {
    this.errors = errors;
    this.name = name;
    this.label = label;
    this.type = null;
    this.message = "";
  }

  /***
   * return required error
   */
  required() {
    return this.message !== "" ? this.message : `${this.label} is required`;
  }

  /**
   * @returns {string}
   */
  pattren() {
    return this.message !== "" ? this.message : `${this.label} is not valid`;
  }

  /**
   *
   * @returns {string}
   */
  minLength() {
    return this.message !== ""
      ? this.message
      : `${this.label} must be more than `;
  }

  /***
   *
   * @returns {string}
   */
  maxLength() {
    return this.message !== "" ? this.message : `${this.label} more than`;
  }

  /**
   *
   * @returns {string}
   */
  manual() {
    return this.message;
  }

  /**
   *
   * @returns {string}
   */
  validate() {
    return this.message;
  }

  /***
   * switch errors
   */
  checkInputType() {
    if (this.errors && this.errors[this.name] && this.errors[this.name].type) {
      this.type = this.errors[this.name].type;
      this.message =
        (this.errors &&
          this.errors[this.name] &&
          this.errors[this.name].message) ??
        "";
      switch (this.type) {
        case "required":
          return this.required();
        case "validate":
          return this.validate();
        case "pattern":
          return this.pattren();
        case "minLength":
          return this.minLength();
        case "maxLength":
          return this.maxLength();
        case "manual":
          return this.manual();
        default:
          return;
      }
    }
  }
}

export default FrontEndErrorsProvider;
