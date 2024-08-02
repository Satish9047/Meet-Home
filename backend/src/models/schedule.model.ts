import { ref, string } from 'joi';
import mongoose from 'mongoose';
import { text } from 'stream/consumers';
import { ISchedule } from '../Interface/interfaces';

const scheduleSchema = new mongoose.Schema(
  {
    house: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    visited: {
      type: Boolean,
      required: true,
    },
    userMessage: {
      type: string,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Schedule = mongoose.model<ISchedule>('Schedule', scheduleSchema);
