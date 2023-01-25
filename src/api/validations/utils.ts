import isEmail from 'validator/lib/isEmail';
import isMongoId from 'validator/lib/isMongoId';
// create a regex for password validation - at least one lowercase, one uppercase, one number, minimum 8 characters
export const passwordRegexWithoutSpecialChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export const passwordRegexWithoutSpecialCharError =new Error ('Password must contain at least one lowercase, one uppercase, one number, minimum 8 characters');
export const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const stringPassswordError = new Error('Password must contain At least one upper case, one lower case leter, one digit, one special character and a Minimum of 8 length');

export const getPasswordStrenthtLevel = (password: string, lenght: number = 8): number => {
  if (password.length < lenght) { return 0 }
  var level = 0;
  level += password.length > 6 ? 1 : 0;
  level += /[!@#$%^&*?_~]{2,}/.test(password) ? 1 : 0;
  level += /[a-z]{2,}/.test(password) ? 1 : 0;
  level += /[A-Z]{2,}/.test(password) ? 1 : 0;
  level += /[0-9]{2,}/.test(password) ? 1 : 0;
  return level;
}

export const isEmailValid = (email: string): true | Error => {
  if (!isEmail(email)) {
    throw 'Email is not valid';
  }
  return true;
}

export const isMongoIdValid = (id: string): true | Error => {
  if (!isMongoId(id)) {
    throw 'Id is not valid';
  }
  return true;
}
