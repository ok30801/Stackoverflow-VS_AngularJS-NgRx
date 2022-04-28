import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StackOverflowDataService {

  constructor(private http: HttpClient) { }

  // public searchQuery$ = new Subject();
  public search$ = new Subject();

  // searchUrl: any

  fetchStackOverflowData(searchPhrase: string) {
    return this.http.get(`${environment.apiUrl}${searchPhrase}&site=${environment.site}`)
      .pipe(map(response => response))
  }

  // getStackOverflowData(searchPhrase: string) {
  //   this.searchUrl = this.http.get(`${environment.apiUrl}${searchPhrase}&site=${environment.site}`)
  //   this.searchQuery$.next(searchPhrase);
  //   this.search$.next(this.searchUrl);
  // }
}
