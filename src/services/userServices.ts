import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import { IUser } from '../types/userSchemaType';
import { NextRequest, NextResponse } from 'next/server';

// create a user
async function create(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt' | 'isAdmin'>) {
  await connectDB();

  const newUser = new User({
    ...userData,
    isAdmin: false,
  });

  return await newUser.save();
}

// find a user by email
async function findByEmail(email: string) {
  await connectDB();
  return User.findOne({ email }).lean();
}

// find a user by username
async function findByUsername(username: string) {
  await connectDB();
  return await User.findOne({ username }).lean();
}

// find a user by id
async function findById(id: string) {
  await connectDB();
  return await User.findById(id).lean();
}

// update fields
async function update(id: string, updateData: Partial<IUser>) {
  await connectDB();
  const updateObj: Partial<IUser> = {
    ...updateData,
    updatedAt: new Date(),
  };

  return await User.findByIdAndUpdate(id, updateObj, { new: true }).lean();
}

// delete a user
async function deleteUser(id: string) {
  await connectDB();
  return await User.findByIdAndDelete(id);
}

// get all users
async function getAll(page = 1, limit = 100) {
  try {
    await connectDB();

    // Add pagination support
    const skip = (page - 1) * limit;

    return await User.aggregate([
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          username: 1,
          profilePic: 1,
          coverPic: 1,
          isAdmin: 1,
          emailVerified: 1,
          phoneVerified: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch users:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
    }
    throw new Error('Failed to fetch users. Please try again later.');
  }
}

// clear auth cookies
async function clearAuthCookie() {
  const options = {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  return options;
}

// get current loggedIn User
async function getCurrentUser(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  await connectDB();
  const currentUser = await User.findById(userId)
    .select('-password -refreshToken')
    .lean({ virtuals: true });
  return currentUser;
}

// check if user is admin or not
async function requireAdmin(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  await connectDB();

  // Only check the isAdmin field - no other projections
  const user = await User.findOne(
    { _id: userId },
    { isAdmin: 1 } // Only fetch the isAdmin field
  )
    .lean<{ isAdmin?: boolean }>()
    .exec();

  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: 'Admin privileges required' }, { status: 403 });
  }

  return user;
}
const userService = {
  create,
  findByEmail,
  findByUsername,
  findById,
  update,
  deleteUser,
  getAll,
  clearAuthCookie,
  getCurrentUser,
  requireAdmin,
};

export default userService;
