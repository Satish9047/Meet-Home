import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { AuthResponseData } from '../interface/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  // private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getUserState(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  /**
   * Login logic
   *
   * @param email
   * @param password
   * @returns Observable
   */
  getLogin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:4000/api/v1/auth/login',
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      )
      .pipe(
        tap((response) => {
          // const expirationDate = new Date(
          //   new Date().getTime() + 60 * 60 * 1000,
          // );

          const user = new User(
            response.data._id,
            response.data.email,
            response.data.isAdmin,
          );

          this.userSubject.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          // this.autoLogout(60 * 60 * 1000);
        }),
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
    return this.http.post<AuthResponseData>(
      `http://localhost:4000/api/v1/auth/register`,
      {
        email: email,
        password: password,
      },
    );
  }

  getLogout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
  }
}
