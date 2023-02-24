import { hashPassword, checkPassword } from '../../src/api/utils/password';

describe('the password manager', () => {
  // test for hashing
  test('should return a hashed password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toBe(password);
  })

  // test for checking
  test('should return true if the password is correct', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    const correct = await checkPassword(password, hashedPassword);
    expect(correct).toBe(true);
  })

  // test for checking
  test('should return false if the password is incorrect', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    const correct = await checkPassword('wrong', hashedPassword);
    expect(correct).toBe(false);
  })
})