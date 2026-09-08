import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/norfat.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/v1/auth';
  private currentUserSignal = signal<AuthResponse | null>(this.getStoredUser());

  currentUser = computed(() => this.currentUserSignal());
  isAuthenticated = computed(() => !!this.currentUserSignal()?.token);
  isAdmin = computed(() => this.currentUserSignal()?.role === 'Admin');
  isClient = computed(() => this.currentUserSignal()?.role === 'Client');

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(res => this.setSession(res))
    );
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => this.setSession(res))
    );
  }

  logout(): void {
    localStorage.removeItem('norfat_auth');
    this.currentUserSignal.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return this.currentUserSignal()?.token ?? null;
  }

  private setSession(auth: AuthResponse): void {
    localStorage.setItem('norfat_auth', JSON.stringify(auth));
    this.currentUserSignal.set(auth);
  }

  private getStoredUser(): AuthResponse | null {
    try {
      const item = localStorage.getItem('norfat_auth');
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }
}
