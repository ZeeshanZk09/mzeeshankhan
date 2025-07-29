import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import { IUser } from '@/types/userSchemaType';
import bcrypt from 'bcryptjs';

async function create(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt' | 'isAdmin'>) {
  await connectDB();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = new User({
    ...userData,
    password: hashedPassword,
    isAdmin: false,
  });

  return await newUser.save();
}

async function findByEmail(email: string) {
  await connectDB();
  return User.findOne({ email }).lean();
}

async function findByUsername(username: string) {
  await connectDB();
  return User.findOne({ username }).lean();
}

async function findById(id: string) {
  await connectDB();
  return User.findById(id).lean();
}

async function update(id: string, updateData: Partial<IUser>) {
  await connectDB();
  let updateObj: Partial<IUser> = {};

  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    updateObj.password = await bcrypt.hash(updateData.password, salt);
  }

  updateObj = {
    ...updateData,
    updatedAt: new Date(),
  };

  return User.findByIdAndUpdate(id, updateObj, { new: true }).lean();
}

async function deleteUser(id: string) {
  await connectDB();
  return User.findByIdAndDelete(id);
}

async function getAll() {
  await connectDB();
  return User.find().lean();
}

async function comparePasswords(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
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
};

export default userService;
