const {
  isArray,
  isNullOrUndefined,
  isNumber,
  isObject,
  isString,
} = require("util");

exports.checkall = (arr, target) => {
  return target.every((v) => arr.includes(v));
};

exports.includesIn = (value, arr) => {
  if (arr.includes(value)) {
    return true;
  }
  return false;
};
