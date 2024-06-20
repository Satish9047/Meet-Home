import { Injectable } from '@angular/core';
import { houses } from '../data/homes';
import { IHouse } from '../interface/app';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  protected houseList = houses;
  constructor() {}
  getAllHouses(): IHouse[] {
    return this.houseList;
  }
  getHouseById(id: number): IHouse | undefined {
    return this.houseList.find((house) => house.id === id);
  }
}
