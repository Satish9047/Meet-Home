import { Injectable } from '@angular/core';
import { houses } from '../data/homes';
import { IHouse } from '../interface/app';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  protected houseList = houses;
  constructor() {}
  getAllHouses(): IHouse[] {
    return this.houseList;
  }
  getHouseById(id: number): Observable<IHouse | undefined> {
    const house = this.houseList.find((house) => house.id === id);
    return of(house);
  }
}
