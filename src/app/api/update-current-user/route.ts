import userService from '@/services/userServices';
import { IUser } from '@/types/userSchemaType';
import { ApiError } from '@/utils/NextApiError';
import { ApiSuccess } from '@/utils/NextApiSuccess';
import { validateSignInInput } from '@/utils/validators';
import { NextResponse } from 'next/server';

export default async function PATCH(req: Request) {
  const startTime = Date.now();
  try {
    const userId = req.headers.get('x-user-id');
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const input = await req.json();
    const validationError = validateSignInInput(
      input as Pick<IUser, 'username' | 'email' | 'phone' | 'password'>
    );
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const user = userService.update(userId as string, input);
    if (typeof user != 'object') {
      return NextResponse.json({ error: 'Failed to update user profile' }, { status: 400 });
    }
    const success = ApiSuccess.ok({ user }, { responseTime: `${Date.now() - startTime}ms` });
    return success.toNextResponse();
  } catch (error) {
    if (error instanceof ApiError) {
      error.log();
      return error.toNextResponse();
    }

    // Handle unexpected errors
    const unexpectedError = ApiError.internal('An unexpected error occurred');
    unexpectedError.log();
    return unexpectedError.toNextResponse();
  }
}
