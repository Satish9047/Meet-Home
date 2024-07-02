import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IAuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expireIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // baseUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  // getLogin(email: string, password: string) {
  //   this.http.post(`${this.baseUrl}/login`, {
  //     email,
  //     password,
  //   });
  // }
  getRegister(email: string, password: string) {
    return this.http.post<IAuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQoWg4rHTnFfgtM30Y-vB6w6Mt2rYKx-c `,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    );
  }
}
