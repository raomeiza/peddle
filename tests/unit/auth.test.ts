import auth, {JsonWebTokenError2} from '../../src/api/middlewares/auth';
import { signToken } from '../../src/api/utils/tokenizer';

describe('the token manager', () => {
  // moke a request object
  const req = {
    headers: {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjY3YjY3MzA0MjE1MzQwMjIyMzQ4ZSIsImlhdCI6MTYxNjQ2NzE2NiwiZ',
    },
  }

  const user = {
    userId: '60267b67304215340222348e',
    email: 'user1@admin.com',
    is_admin: false,
  }

  // test for empty token
  test('should return please login first ', async () => {
    try {
      await auth({});
    } catch (err: any) {
      expect(err).toBeInstanceOf(JsonWebTokenError2);
      expect(err.message).toBe('Please log in first');
      expect(err.status).toBe(401);
    }
  })

  // test for invalid token
  test('should return invalid token', async () => {
    try {
      await auth(req);
    } catch (err: any) {
      expect(err).toBeInstanceOf(JsonWebTokenError2);
      expect(err.message).toBe('Invalid token');
      expect(err.status).toBe(401);
    }
  })

  // test for valid token
  test('should return an object with user', async () => {
    const token = await signToken(user);
    req.headers.authorization = `Bearer ${token}`;
    await auth(req);
    //@ts-ignore
    expect(req.decodedUser)
    .toHaveProperty('iat', expect.any(Number))
    //@ts-ignore
    expect(req.decodedUser)
    .toHaveProperty('exp', expect.any(Number))
    //@ts-ignore
    expect(req.decodedUser)
    .toHaveProperty('userId', user.userId)
    //@ts-ignore
    expect(req.decodedUser)
    .toHaveProperty('email', user.email)
    //@ts-ignore
    expect(req.decodedUser)
      .toHaveProperty('is_admin', user.is_admin);
  })

  // expiring token
  test('should return invalid token', async () => {
    const token = await signToken(user, '1s');
    req.headers.authorization = `Bearer ${token}`;
    setTimeout(async () => {
      try {
        await auth(req);
      } catch (err: any) {
        expect(err).toBeInstanceOf(JsonWebTokenError2);
        expect(err.message).toBe('Invalid token');
        expect(err.status).toBe(401);
      }
    }, 2000);
  })
})
