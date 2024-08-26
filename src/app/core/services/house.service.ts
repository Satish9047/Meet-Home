import { Injectable } from '@angular/core';
import { houses } from '../data/homes';
import { Observable, of } from 'rxjs';
import {
  AuthResponseData,
  House,
  HouseDetailsResponseData,
  HouseResponseData,
} from '../interface/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  protected houseList = houses;
  constructor(private http: HttpClient) {}

  getAllHouses(page?: number, limit?: number): Observable<HouseResponseData> {
    return this.http.get<HouseResponseData>(
      `http://localhost:4000/api/v1/house?page=${page}&limit=${limit}`,
    );
  }
  getHouseById(id: number): Observable<HouseDetailsResponseData> {
    return this.http.get<HouseDetailsResponseData>(
      `http://localhost:4000/api/v1/house/${id}`,
    );
  }
}
