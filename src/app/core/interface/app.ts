import { houses } from './../../../../backend/src/data/house';
export interface House {
  _id: number;
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
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserData {
  _id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseData {
  statusCode: number;
  data: UserData;
  message: string;
  success: string;
}

export interface AuthErrorResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

export interface HouseResponseData {
  statusCode: number;
  data: {
    houses: House[];
    Page: number;
    limit: number;
    totalPages: number;
    totalHouse: number;
  };
  message: string;
  success: string;
}
export interface HouseDetailsResponseData {
  statusCode: number;
  data: House;
  message: string;
  success: string;
}
