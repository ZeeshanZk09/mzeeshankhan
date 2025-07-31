import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import { IUser } from '../types/userSchemaType';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { NODE_ENV } from '@/lib/constants';

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
async function getAll() {
  await connectDB();
  return await User.find()
    .select(
      '-emailVerificationToken -emailVerificationExpires  -phoneVerificationToken -phoneVerificationExpires -providers -password -refreshToken -updatedAt'
    )
    .limit(100)
    .lean();
}

// compare hashed passwords
async function comparePasswords(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

// clear auth cookies
async function clearAuthCookie() {
  const options = {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: NODE_ENV === 'production',
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
  return await User.findById(userId).select('-password -refreshToken').lean();
}

// check if user is admin or not
async function requireAdmin(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  await connectDB();
  const user = (await User.findById(userId).select('-password -refreshToken isAdmin').lean()) as {
    isAdmin?: boolean;
  } | null;

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
  comparePasswords,
  clearAuthCookie,
  getCurrentUser,
  requireAdmin,
};

export default userService;
