import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@/lib/serverConstants';
import User from '@/models/User';
import mongoose, { ObjectId } from 'mongoose';

export default async function generateAccessAndRefreshTokens(userId: ObjectId) {
  try {
    const userIdStr = userId.toString();
    if (!mongoose.Types.ObjectId.isValid(userIdStr)) {
      throw new Error('Invalid user ID format');
    }

    // 2. Find user with additional checks
    const user = await User.findById(userIdStr);
    console.log(user);
    if (!user) {
      throw new Error('User not found');
    }

    // 3. Check if token secrets exist
    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      throw new Error('Token secrets not configured in environment variables');
    }

    // 4. Generate tokens with error handling
    let accessToken, refreshToken;
    try {
      accessToken = await user.generateAccessToken();
      refreshToken = await user.generateRefreshToken();
    } catch (tokenError) {
      console.error('Token generation error:', tokenError);
      throw new Error('Failed to sign tokens');
    }

    console.log(user);

    // 5. Save refresh token with additional validation
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Error in generateAccessAndRefreshTokens:', error);
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to generate tokens');
    } else {
      throw new Error('Failed to generate tokens');
    }
  }
}
