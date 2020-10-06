import i18next from "Providers/Languages/TranslationProvider";

/***
 * custom email address
 * @type {{min: {message: string, value: number}, max: {message: string, value: number}, pattern: {message: string, value: RegExp}, required: {message: string, value: boolean}}}
 */

export const EmailValidation = {
  pattern: { value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, message: i18next.t('not-valid-email')},
  required: { value: true, message: i18next.t('email-is-required') },
  maxLength: { value: 50, message: i18next.t('email-address-length') }
};

/**
 * custom password validation
 * @type {{min: {message: string, value: number}, max: {message: string, value: number}, required: {message: string, value: boolean}}}
 */
export const PasswordValidation = {
  required: { value: true, message:  i18next.t('required-password')},
  minLength: { value: 6, message:   i18next.t('more-than-password')},
  maxLength: { value: 50, message: i18next.t('less-than-password')}
};

/**
 * any text validation
 * @param name
 * @returns {{minLength: {message: string, value: number}, required: {message: string, value: boolean}, maxLength: {message: string, value: number}}}
 * @constructor
 */
export const RequiredMinMAx = (name, min, max) => {
  return {
    required: { value: true, message: name +  i18next.t('required')},
    minLength: { value: min, message: name + i18next.t('more-than') + min },
    maxLength: { value: max, message: max + i18next.t('less-than') + max }
  };
};


/***
 * reuired validation only
 * @param name
 * @returns {{required: {message: string, value: boolean}}}
 * @constructor
 */
export const RequiredOnly = (name) => {
  return {
    required: { value: true, message: name +  i18next.t('required')},
  };
};

/***
 * phone number validation
 * @type {{min: {message: string, value: number}, max: {message: string, value: number}, pattern: {message: string, value: RegExp}, required: {message: string, value: boolean}}}
 */
export const PhoneNumberValidation = {
  pattern: {
    value: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
    message: "Invalid phone number"
  },
  required: { value: true, message: i18next.t('phone-not-valid') }
};

