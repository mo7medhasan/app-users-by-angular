import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  [x: string]: any;
  constructor(private apiService: ApiService) {}

  public searchUsers(query: string): Observable<any> {
    // if (!query || !Number.isInteger(parseInt(query, 10))) {
    //   return [];
    // }

    return this.apiService.getUsers(1).pipe(
      map((users: any) => {
        const user = users.find((u: any) => u.id.toString() === query);

        if (user) {
          return [user];
        }

        return [];
      })
    );
  }
}