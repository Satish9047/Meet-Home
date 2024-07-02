import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IAuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expireIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Login logic
   *
   * @param email
   * @param password
   * @returns Observavle
   */
  getLogin(email: string, password: string) {
    return this.http.post<IAuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQoWg4rHTnFfgtM30Y-vB6w6Mt2rYKx-c',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    );
  }

  /**
   * Register Logic
   *
   * @param email
   * @param password
   * @returns Observable with IAuthResponseDataI
   */
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
