import { timeStamp } from 'console';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
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
export const User = mongoose.model('User', userSchema);
