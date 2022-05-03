import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StackOverflowDataService {

  constructor(private http: HttpClient) { }

  // public search$ = new Subject();

  getStackOverflowData(searchPhrase: string) {
    return this.http.get(`${environment.apiUrl}${searchPhrase}&site=${environment.site}`)
      .pipe(map(response => response))
  }
  getAuthorData(id: number) {
    return this.http.get(`${environment.apiAuthorUrl}${id}/questions?order=desc&sort=activity&site=${environment.site}`)
      .pipe(map(response => response))
  }
  getTagData(tag: string) {
    return this.http.get(`${environment.apiTagUrl}${tag}/faq?site=${environment.site}`)
      .pipe(map(response => response))
  }

}
