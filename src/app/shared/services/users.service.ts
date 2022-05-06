import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Users } from '../interfaces/interfaces';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) { }


  fetchUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${environment.usersDbUrl}`)
  }

  addUser(userData: Users) {
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(userData);
    this.http.post(environment.usersDbUrl, body,{'headers':headers})
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      )
      .subscribe()
  }
}
