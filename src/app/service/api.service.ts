import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  public getUsers(page: number): Observable<any> {
    const cacheKey = `users-page-${page}`;

    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]);
    }

    return this.http.get(`https://reqres.in/api/users?page=${page}`).pipe(
      map((response: any) => {
     
        this.cache[cacheKey] = response.data;
        return response.data;
      }),
      shareReplay()
    );
  }

  public getUser(id: number): Observable<any> {
    const cacheKey = `user-${id}`;

    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]);
    }

    return this.http.get(`https://reqres.in/api/users/${id}`).pipe(
      map((response: any) => {
        this.cache[cacheKey] = response.data;
     
        return response.data;
      }),
      shareReplay()
    );
  }
}