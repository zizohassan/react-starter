/**
 * generate random number
 * @returns {number}
 * @constructor
 */
export const RandomInt = (max) =>  {
  return Math.floor(Math.random() * Math.floor(max));
};
