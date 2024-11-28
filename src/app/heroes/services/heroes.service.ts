import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';

import { environments } from '../../../environments/environments';
import { catchError, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private readonly baseUrl: string = environments.baseUrl;
  constructor(private readonly http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error fetching hero by ID:', error);
        return of(undefined);
      })
    );
  }
}
