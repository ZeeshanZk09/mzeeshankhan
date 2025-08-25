import { Schema, model, models } from 'mongoose';
import connectDB from '../lib/db/connect';
import { IUser } from '../types/userSchemaType';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from '@/lib/serverConstants';

connectDB()
  .then((db) => db)
  .catch((err) => console.log(err));

const nameRegex = /^[A-Za-z\s]+$/;
const usernameRegex = /^[a-zA-Z0-9._-]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%[*?()#&\/|^'".,{}]).{6,20}$/;
const emailRegex = /^[\p{L}0-9._%+-]+@[\p{L}0-9.-]+\.[\p{L}]{2,}$/u;

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required.'],
      validate: {
        validator: function (v) {
          return nameRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid First Name. Only letters are allowed.`,
      },
      trim: true,
      maxlength: [20, 'max 20 chars are allowed.'],
      minlength: [6, 'min 6 chars are required.'],
    },
    lastName: {
      type: String,
      validate: {
        validator: function (v) {
          return nameRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid Last Name. Only letters are allowed.`,
      },
      trim: true,
      maxlength: [20, 'max 20 chars are allowed.'],
    },
    username: {
      type: String,
      required: [true, 'username is required.'],
      validate: {
        validator: function (v) {
          const allowedChars = usernameRegex;
          const hasUpper = /[A-Z]/;
          const hasLower = /[a-z]/;
          const hasDigit = /\d/;
          const hasSpecial = /[._-]/;

          return (
            allowedChars.test(v) &&
            hasUpper.test(v) &&
            hasLower.test(v) &&
            hasDigit.test(v) &&
            hasSpecial.test(v)
          );
        },
        message: (props) =>
          `${props.value} is not a valid username! It must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character (., _, or -), and only these characters are allowed.`,
      },
      index: true,
      unique: [true, 'username already exists.'],
      trim: true,
      maxlength: [20, 'max 20 chars are allowed.'],
      minlength: [6, 'min 6 chars are required.'],
    },
    email: {
      type: String,
      required: [true, 'email is required.'],
      validate: {
        validator: function (v) {
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      index: true,
      unique: [true, 'email already exists.'],
      lowercase: true,
      trim: true,
      maxlength: [100, 'max 100 chars are allowed.'],
      minlength: [6, 'min 6 chars are required.'],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      trim: true,
    },
    emailVerificationExpires: {
      type: Date,
      default: () => Date.now() + 10 * 60 * 1000,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v: string) {
          return validator.isMobilePhone(v, 'any');
        },
        message: 'Invalid phone number format.',
      },
      trim: true,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerificationToken: {
      type: String,
      trim: true,
    },
    phoneVerificationExpires: {
      type: Date,
      default: () => Date.now() + 10 * 60 * 1000,
    },
    image: {
      type: String,
      trim: true,
    },
    providers: {
      google: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
    },
    password: {
      type: String,
      required: [true, 'password is required.'],
      validate: {
        validator: function (v) {
          return passwordRegex.test(v);
        },
        message:
          'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (e.g., @$!%*?&).',
      },
      trim: true,
      maxlength: [20, 'max 20 chars are allowed.'],
      minlength: [6, 'min 6 chars are required.'],
    },
    refreshToken: {
      type: String,
    },
    profilePic: {
      url: {
        type: String,
        trim: true,
      },
      public_id: {
        type: String,
        trim: true,
      },
    },
    coverPic: {
      url: {
        type: String,
        trim: true,
      },
      public_id: {
        type: String,
        trim: true,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = models?.User || model<IUser>('User', userSchema);

export default User;
