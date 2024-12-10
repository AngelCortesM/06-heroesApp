import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private readonly http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) =>
        localStorage.setItem(
          'token',
          'sdaftvrebrfre56465y.35b6g5n7yb6b67bw7.n8ny58bnrynn56b5yw45'
        )
      )
    );
  }
  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      map((user) => !!user),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
