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

type AuthCredentials = Pick<IUser, 'username' | 'email' | 'phone' | 'password'>;

type ImageUpload = {
  url: string;
  public_id: string;
};

type SignUpPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  profilePic?: File | null;
  coverPic?: File | null;
};

type SafeUser = Omit<
  IUser,
  | 'password'
  | 'refreshToken'
  | 'emailVerificationToken'
  | 'emailVerificationExpires'
  | 'phoneVerificationToken'
  | 'phoneVerificationExpires'
  | 'providers'
>;

export type { IUser, AuthCredentials, ImageUpload, SignUpPayload, SafeUser };
