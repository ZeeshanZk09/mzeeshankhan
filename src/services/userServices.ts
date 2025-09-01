import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import { SafeUser } from '../types/userSchemaType';
import { NextRequest, NextResponse } from 'next/server';
import { isValidObjectId } from 'mongoose';

// create a user
async function create(userData: SafeUser) {
  try {
    await connectDB();

    const newUser: SafeUser = new User({
      ...userData,
      isAdmin: false,
    });

    const user = await newUser.save();
    return user as SafeUser;
  } catch (error: unknown) {
    return error;
  }
}

// find a user by email
async function findByEmail(email: string) {
  try {
    await connectDB();
    return User.findOne(
      { email },
      {
        password: 0,
        refreshToken: 0,
        __v: 0,
        emailVerificationToken: 0,
        phoneVerificationToken: 0,
        emailVerificationExpires: 0,
        phoneVerificationExpires: 0,
        providers: 0,
      }
    ).lean();
  } catch (error: unknown) {
    return error;
  }
}

// find a user by username
async function findByUsername(username: string) {
  try {
    await connectDB();
    return await User.findOne(
      { username },
      {
        password: 0,
        refreshToken: 0,
        __v: 0,
        emailVerificationToken: 0,
        phoneVerificationToken: 0,
        emailVerificationExpires: 0,
        phoneVerificationExpires: 0,
        providers: 0,
      }
    ).lean();
  } catch (error: unknown) {
    return error;
  }
}

// find a user by id
async function findById(id: string) {
  try {
    await connectDB();
    return await User.findById(id, {
      password: 0,
      refreshToken: 0,
      __v: 0,
      emailVerificationToken: 0,
      phoneVerificationToken: 0,
      emailVerificationExpires: 0,
      phoneVerificationExpires: 0,
      providers: 0,
    }).lean();
  } catch (error: unknown) {
    return error;
  }
}

// update fields
async function update(id: string, updateData: Partial<SafeUser>) {
  try {
    if (isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid user Id' }, { status: 400 });
    }
    await connectDB();
    const updateObj: Partial<SafeUser> = {
      ...updateData,
      updatedAt: new Date(),
    };

    if (!updateObj) {
      return NextResponse.json({ error: 'Failed to update user profile' }, { status: 400 });
    }

    return await User.findByIdAndUpdate(id, updateObj, { new: true }).lean();
  } catch (error: unknown) {
    return error;
  }
}

// delete a user
async function deleteUser(id: string) {
  try {
    await connectDB();
    return await User.findByIdAndDelete(id);
  } catch (error: unknown) {
    return error;
  }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to fetch users:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
    }
    return error;
  }
}

// clear auth cookies
async function clearAuthCookie() {
  try {
    const options = {
      maxAge: 0,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    };

    return options;
  } catch (error: unknown) {
    return error;
  }
}

// get current loggedIn User
async function getCurrentUser(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    await connectDB();
    const currentUser = await User.findById(userId, {
      password: 0,
      refreshToken: 0,
      __v: 0,
      emailVerificationToken: 0,
      phoneVerificationToken: 0,
      emailVerificationExpires: 0,
      phoneVerificationExpires: 0,
      providers: 0,
    }).lean({ virtuals: true });
    return currentUser;
  } catch (error: unknown) {
    return error;
  }
}

// check if user is admin or not
async function requireAdmin(request: NextRequest) {
  try {
    const admin = request.headers.has('x-user-is-admin');
    // if (!admin) {
    //   return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    // }

    // await connectDB();

    // // Only check the isAdmin field - no other projections
    // const user = await User.findOne(
    //   { _id: userId },
    //   { isAdmin: 1 } // Only fetch the isAdmin field
    // )
    //   .lean<{ isAdmin?: boolean }>()
    //   .exec();

    // if (!user || !user.isAdmin) {
    //   return NextResponse.json({ error: 'Admin privileges required' }, { status: 403 });
    // }

    return admin;
  } catch (error: unknown) {
    return error;
  }
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
