import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import config from '../configs/app.config';

export interface IUser extends Document {
  _id?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  generateJwtToken: () => string;
  toObject(): any;
}

//USER SCHEMA
const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

//HASHING THE PASSWORD BEFORE SAVING IT
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, config.SALT_ROUND);
  next();
});

//COMPARING THE PASSWORD METHOD
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

//GENETRATING JWT TOKEN
userSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.JWT_TOKEN_SECRET,
    { expiresIn: config.JWT_EXIPRES_IN },
  );
};

//USER MODEL
export const User = mongoose.model<IUser>('User', userSchema);
