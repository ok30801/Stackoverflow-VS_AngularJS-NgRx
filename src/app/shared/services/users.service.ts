import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/interfaces';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) { }


  fetchUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${environment.usersDbUrl}`)
  }
}
