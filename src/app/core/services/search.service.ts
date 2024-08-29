import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HouseResponseData } from '../interface/app';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  private searchResultSubject = new BehaviorSubject<HouseResponseData | null>(
    null,
  );
  searchResult$ = this.searchResultSubject.asObservable();

  onSearch(param: string): void {
    this.http
      .get<HouseResponseData>(
        `http://localhost:4000/api/v1/house?search=${param}`,
      )
      .subscribe((responseData) => {
        this.searchResultSubject.next(responseData);
      });
  }
}
