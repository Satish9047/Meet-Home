import { Injectable } from '@angular/core';
import { IHouse } from '../interface/app';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private houses: IHouse[] = [
    {
      id: 1,
      house: 'Villa',
      price: 1000000,
      location: 'Byasi-2, Bhaktapur',
      area: '2000 sq. ft',
      kitchen: 1,
      bedrooms: 1,
      bathrooms: 1,
      washrooms: 2,
      imageUrl: '',
      totalFloor: 0,
      available: false,
      description: '',
    },
  ];

  constructor() {}
}
