import bcript from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import config from '../configs/app.config';

//USER SCHEMA
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

//HASHING THE PASSWORD BEFORE SAVING IT
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcript.hash(this.password, config.SALT_ROUND);
  next();
});

//COMPARING THE PASSWORD METHOD
userSchema.methods.comparePassword = async function (password: string) {
  return await bcript.compare(password, this.password);
};

//GENETRATING JWT TOKEN
userSchema.methods.generateJwtToken = function () {
  jwt.sign(
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
export const User = mongoose.model('User', userSchema);
