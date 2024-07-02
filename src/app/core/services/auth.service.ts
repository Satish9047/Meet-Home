import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getLogin(email: string, password: string) {
    this.http.post(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }
  getRegister(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, {
      email,
      password,
    });
  }
}
