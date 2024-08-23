export interface IHouse {
  id: number;
  house: string;
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
