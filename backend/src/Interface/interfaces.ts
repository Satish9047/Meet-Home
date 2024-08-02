import mongoose, { Document } from 'mongoose';
export interface IHouse {
  id: number;
  houseName: string;
  price: number;
  location: string;
  area: string;
  kitchen: number;
  bedrooms: number;
  bathrooms: number;
  washrooms: number;
  imageUrl: string;
  totalFloor: number;
  available: boolean;
  addedBy: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISchedule extends Document {
  house: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  date: Date;
  time: string;
  visited: boolean;
  userMessage: string;
}
