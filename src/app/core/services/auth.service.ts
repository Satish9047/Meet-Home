import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

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
    return this.http
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQoWg4rHTnFfgtM30Y-vB6w6Mt2rYKx-c',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Register Logic
   *
   * @param email
   * @param password
   * @returns Observable with IAuthResponseDataI
   */
  getRegister(email: string, password: string) {
    return this.http
      .post<IAuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQoWg4rHTnFfgtM30Y-vB6w6Mt2rYKx-c `,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes, 'error direct');
    let errorMessage = 'Unknown error occurred';
    if (!errorRes.error.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not registered';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'password is not correct';
        break;
      default:
        errorMessage = 'Unknown error occurred';
    }
    return throwError(() => new Error(errorMessage));
  }
}
