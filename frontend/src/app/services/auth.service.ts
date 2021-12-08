import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../classes/login-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiUrl + '/auth';
  loginUrl: string = this.baseUrl + '/login';
  // Used to login, logout, token manage
  constructor(private http: HttpClient) {}

  login(loginData: LoginModel) {
    return this.http.post<any>(this.loginUrl, loginData);
  }

  saveToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string {
    return localStorage.getItem('jwt_token') || '';
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }

  isLoggedIn() {
    if (this.getToken() && this.getToken() == '') {
      return false;
    }
    return true;
  }
}
