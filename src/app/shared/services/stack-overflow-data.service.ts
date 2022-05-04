import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StackOverflowDataService {

  constructor(private http: HttpClient) { }

  getStackOverflowData(searchPhrase: string) {
    return this.http.get(`${environment.getSearchData}${searchPhrase}&site=${environment.site}`)
      .pipe(map(response => response))
  }
  getAuthorData(id: number) {
    return this.http.get(`${environment.getUser}${id}/questions?order=desc&sort=activity&site=${environment.site}`)
      .pipe(map(response => response))
  }
  getTagData(id: string) {
    return this.http.get(`${environment.getTags}${id}/faq?site=${environment.site}`)
      .pipe(map(response => response))
  }
  getAnswerData(id: number) {
    return this.http.get(`${environment.getQuestion}${id}/answers?order=desc&sort=activity&site=${environment.site}&filter=withbody`)
      .pipe(map(response => response))
  }
  getQuestionData(id: number) {
    return this.http.get(`${environment.getQuestion}${id}?order=desc&sort=activity&site=${environment.site}&filter=withbody`)
      .pipe(map(response => response))
  }
}
