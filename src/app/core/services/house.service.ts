import { Injectable } from '@angular/core';
import { houses } from '../data/homes';
import { Observable } from 'rxjs';
import { HouseDetailsResponseData, HouseResponseData } from '../interface/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  protected houseList = houses;
  constructor(private http: HttpClient) {}

  /**
   * @description           get all houses
   * @param         page    number
   * @param         limit   number
   * @returns               observable
   */
  getAllHouses(page?: number, limit?: number): Observable<HouseResponseData> {
    return this.http.get<HouseResponseData>(
      `http://localhost:4000/api/v1/house?page=${page}&limit=${limit}`,
    );
  }

  /**
   * @description           get house by id
   * @param         id      number
   * @returns               observable
   */
  getHouseById(id: number): Observable<HouseDetailsResponseData> {
    return this.http.get<HouseDetailsResponseData>(
      `http://localhost:4000/api/v1/house/${id}`,
    );
  }
}
