/***
 * manipulate data before send it to api
 * @param data
 * @returns {*}
 * @constructor
 */
export const SignUpTransformer = (data) => {
  data["type"] = "personal";
  data["gender"] = data["gender"].value;

  return data;
};