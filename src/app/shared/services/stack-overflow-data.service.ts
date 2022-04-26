import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data } from '../interfaces/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StackOverflowData {

  constructor(private http: HttpClient) { }

  fetchStackOverflowData() {
    return this.http.get(`${ environment.apiUrl }`)
  }
}
