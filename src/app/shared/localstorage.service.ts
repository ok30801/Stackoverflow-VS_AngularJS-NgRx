import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Users } from './interfaces';


@Injectable({providedIn: 'root'})
export class LocalstorageService {
  constructor() { }

  getDataLocalStorage(): Observable<Users[]> {
    return JSON.parse(localStorage.getItem('userData')  || '{}')
  }
}
