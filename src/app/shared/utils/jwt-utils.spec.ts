import { JwtUtil } from "./jwt-utils";

describe('JWT Util Tests', () => {

  it('Should return decoded token', async () => {
    const foo = JwtUtil.decodeToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    expect(foo).toEqual({ sub: '1234567890', name: 'John Doe', iat: 1516239022 })
  });

  it('Should return null', async () => {
    const foo = JwtUtil.decodeToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    expect(foo).toEqual(null)
  });

  it('Should return null', async () => {
    const foo = JwtUtil.decodeToken("SflKxw.RJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cwlk3435jllk435j3lk4j53lkj45SSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cwlk3435jllk435j3lk4j53lkj45SSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cwlk3435jllk435j3lk4j53lkj45SSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cwlk3435jllk435j3lk4j53lkj45SSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cwlk3435jllk435j3l.k4j53lkj45S");
    expect(foo).toEqual(null)
  });
});