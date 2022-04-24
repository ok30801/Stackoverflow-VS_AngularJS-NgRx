import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Users } from './interfaces';


@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${environment.usersDbUrl}`)
  }
}
