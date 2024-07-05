import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from '../model/user.model';

interface IAuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
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
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.authHandler(
            resData.email,
            resData.localId,
            resData.idToken,
            Number(resData.expiresIn),
          );
        }),
      );
  }

  autoLogin() {
    console.log('autoLogin');
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );
    console.log(loadedUser.token, 'check token');

    if (loadedUser.token) {
      console.log('autoLogin success');
      this.user.next(loadedUser);
    }
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

  getLogout() {
    this.user.next(null);
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
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not registered';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'invalid login credentials';
        break;
      default:
        errorMessage = 'Unknown error occurred';
    }
    return throwError(() => new Error(errorMessage));
  }

  private authHandler(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
