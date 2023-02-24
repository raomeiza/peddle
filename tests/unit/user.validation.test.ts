import { login, signup, profile, verifyToken, forgotPassword, resetPassword } from '../../src/api/validations/user.validation';


describe('User validation', () => {
  describe('login', () => {
    it('should return an error if email is missing', () => {
      const { error } = login.validate({ password: 'password' });
      console.log(error);
      expect(error).toBeDefined();
      expect(error?.message).toBe('"email" is required');
    });

    it('should return an error if password is missing', () => {
      const { error } = login.validate({ email: user.email });
      expect(error).toBeDefined();
      expect(error?.message).toBe('"password" is required');
    });

    it('should return an error if email is invalid', () => {
      const { error } = login.validate({ email: 'user1admin.com', password: 'password' });
      expect(error).toBeDefined();
      expect(error?.message).toBe('Invalid email address');
    });
  });
  
let user = {
  email: 'user1@admin.com',
  password: 'password1234WQESD',
  repeatPassword: 'password1234WQESD',
  is_admin: false,
};

  describe('signup (some of the validations have already been done during login test', () => {
    it('should return an error if password does not match repeat password', () => {
      const { error } = signup.validate({ ...user, repeatPassword: 'password1' });
      expect(error).toBeDefined();
      expect(error?.message).toBe('Passwords do not match');
    });

  });
  // undo the last 2 commits
    
})