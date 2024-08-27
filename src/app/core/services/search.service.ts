import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HouseResponseData } from '../interface/app';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  onSearch(param: string): Observable<HouseResponseData> {
    return this.http.get<HouseResponseData>(
      `http://localhost:4000/api/v1/house?search=${param}`,
    );
  }
}
