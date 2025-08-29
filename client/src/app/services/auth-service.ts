import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:6500/auth';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getUserInfo() {
    return this.http.get<User>(`${this.apiUrl}/${localStorage.getItem('userId')}`);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
