/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 05/03/2025 19:21
 */

import jwt, { SignOptions, VerifyErrors } from 'jsonwebtoken';

export const createToken = (
  secret: string,
  payload: object,
  options?: SignOptions
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
    ...options,
  });
};

export const verifyToken = <T = any>(secret: string, token: string): T => {
  try {
    return jwt.verify(token, secret) as T;
  } catch (error) {
    const e = error as VerifyErrors;
    throw new Error(`Token verification failed: ${e.message}`);
  }
};
