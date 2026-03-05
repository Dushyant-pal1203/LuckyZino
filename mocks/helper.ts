/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 26/11/2024 17:18
 */
import { JWTPayload, SignJWT } from 'jose';
import { HttpResponse, StrictResponse } from 'msw';
import { User } from '@/types/user';

const SECRET_KEY = new TextEncoder().encode(process.env.AUTH_SECRET);

export const generateJwt = async (user: User, expiresIn: string = "1h"): Promise<string> => {
  const payload = { sub: user.id, name: user.nickName };

  return await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(SECRET_KEY);
}

export const createResponseMock = <T>(data: T): StrictResponse<any> => {
  return HttpResponse.json(data);
};

export const createErrorResponseMock = (
  error: string,
  reason?: string,
  status: number = 400,
): StrictResponse<any> => {
  return HttpResponse.json({ reason, message: error }, { status });
};
