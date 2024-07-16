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
  addedBy: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
