// src/lib/token.ts
import { SignJWT, jwtVerify } from 'jose';

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);

// Define a type for JWT payload
export type JWTPayload = Record<string, unknown>;

// Create access token (short-lived)
export async function createAccessToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d') // 15 minutes
    .sign(ACCESS_TOKEN_SECRET);
}

// Create refresh token (long-lived)
export async function createRefreshToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d') // 7 days
    .sign(REFRESH_TOKEN_SECRET);
}

// Verify access token
export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET);
    return { payload, valid: true };
  } catch (error) {
    return { error, valid: false };
  }
}

// Verify refresh token
export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, REFRESH_TOKEN_SECRET);
    return { payload, valid: true };
  } catch (error) {
    return { error, valid: false };
  }
}
