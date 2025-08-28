import { IUser } from '@/types/userSchemaType';
import validator from 'validator';
export function validateSignInInput(
  input: Pick<IUser, 'username' | 'email' | 'phone' | 'password'>
): string | null {
  if (!input) return 'Request body is required';

  const { username, email, phone, password } = input;

  if (!password) return 'Password is required';
  if (!username && !email && !phone) {
    return 'Email, username or phone is required';
  }

  return null;
}

export function validateSignUpInput(
  input: Pick<IUser, 'firstName' | 'lastName' | 'username' | 'email' | 'password' | 'phone'>
): string | null {
  if (!input) return 'Request body is required';

  const { firstName, lastName, username, email, password } = input;

  // Required fields
  if (!firstName) return 'First name is required';
  if (!lastName) return 'Last name is required';
  if (!username) return 'Username is required';
  if (!email) return 'Email is required';
  if (!password) return 'Password is required';

  // Field validation
  if (!validator.isEmail(email)) return 'Invalid email format';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (username.length < 3) return 'Username must be at least 3 characters';

  // Optional phone validation
  if (input.phone && !validator.isMobilePhone(input.phone)) {
    return 'Invalid phone number format';
  }

  return null;
}

export function validateForgotPasswordInput(
  input: Pick<IUser, 'username' | 'email' | 'phone'>
): string | null {
  if (!input) return 'Request body is required';

  const { username, email, phone } = input;
  if (!username && !email && !phone) {
    return 'Email, username or phone is required';
  }

  return null;
}
