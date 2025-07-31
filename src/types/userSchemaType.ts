import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  emailVerified?: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  phone: string;
  phoneVerified: boolean;
  phoneVerificationToken: string;
  phoneVerificationExpires: Date;
  image: string;
  providers: {
    google: string;
    github: string;
    linkedin: string;
  };
  password: string;
  refreshToken: string;
  profilePic: string;
  coverPic: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type { IUser };
