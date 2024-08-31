import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { AuthResponseData } from '../interface/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  /**
   * Login logic
   *
   * @param email
   * @param password
   * @returns Observable
   */
  getLogin(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'http://localhost:4000/api/v1/auth/login',
      {
        email: email,
        password: password,
      },
      { withCredentials: true },
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
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
