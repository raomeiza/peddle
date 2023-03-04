import isEmail from 'validator/lib/isEmail';
import isMongoId from 'validator/lib/isMongoId';
// create a regex for password validation - at least one lowercase, one uppercase, one number, minimum 8 characters
export const passwordRegexWithoutSpecialChar = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
export const passwordRegexWithoutSpecialCharError =new Error ('Password must contain at least one lowercase, one uppercase, one number, minimum 8 characters');
export const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const stringPassswordError = 'Password must contain At least one upper case, one lower case leter, one digit, one special character and a Minimum of 8 length';

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

export const isEmailValid = (email: string, helper: any): any => {
  if (!isEmail(email)) {
    if(helper.message) {
      return helper.message('Invalid email address')
    }
    throw { message: 'Invalid email address', status: 400 }
  }
  return true;
}

export const isMongoIdValid = (id: string, helper?:any): any => {
  if (!isMongoId(id)) {
    if(helper.message) {
      return helper.message('Invalid Id')
    }
    throw { message: 'Invalid Id', status: 400 }
  }
  return true;
}
