import { SignOptions } from 'jsonwebtoken';

const EMAIL_USER = process.env.EMAIL_USER as string;
const EMAIL_PASS = process.env.EMAIL_PASS as string;
const NEXT_PUBLIC_RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY as string;
const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = 'mzeeshankhan';
const NODE_ENV = process.env.NODE_ENV;
const ACCESS_TOKEN_EXPIRY: SignOptions['expiresIn'] = '1d';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_EXPIRY: SignOptions['expiresIn'] = '30d';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export {
  EMAIL_USER,
  EMAIL_PASS,
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  RECAPTCHA_SECRET_KEY,
  MONGODB_URI,
  DB_NAME,
  NODE_ENV,
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
};
