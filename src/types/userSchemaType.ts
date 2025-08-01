import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

interface IUser extends Document {
  _id: ObjectId;
  fullName?: string;
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
  profilePic: {
    url: string;
    public_id: string;
  };
  coverPic: {
    url: string;
    public_id: string;
  };
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type { IUser };
