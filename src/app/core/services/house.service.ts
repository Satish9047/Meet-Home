import { Injectable } from '@angular/core';
import { houses } from '../data/homes';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private houses = houses;
  constructor() {}
  getAllHouses() {
    return this.houses;
  }
}
