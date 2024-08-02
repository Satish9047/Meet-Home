import mongoose from 'mongoose';
import { IHouse } from '../Interface/interfaces';

/**
 * @description   House schema
 * @returns       void
 */
const houseSchema = new mongoose.Schema(
  {
    houseName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    kitchen: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    washrooms: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    totalFloor: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const House = mongoose.model<IHouse>('House', houseSchema);
