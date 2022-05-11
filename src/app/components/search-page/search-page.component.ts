import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../shared/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { isSuccessSearch, apiData, addSearchQuery } from '../../store/actions/actions';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  focused!: true
  form!: FormGroup
  formError = false
  resultObject: any

  constructor(
    private http: HttpClient,
    private router: Router,
    private data: ApiService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      searchPhrase: new FormControl('', [Validators.required])
    })
  }
  handleSearch() {
    if (this.form.invalid) {
      this.formError = true
    } else {
      this.router.navigateByUrl(`result/query/${this.form.value.searchPhrase}`)
    }
    this.getStackOverflowData()
    const searchQuery = {query: this.form.value.searchPhrase}
    localStorage.setItem('searchQuery', JSON.stringify(searchQuery))
    this.store.dispatch(addSearchQuery({payload: searchQuery.query}))
  }

  getStackOverflowData() {
    this.data.getStackOverflowData(this.form.value.searchPhrase)
      .subscribe(item => {
        this.resultObject = item
        if (this.resultObject) {
          this.store.dispatch(isSuccessSearch({payload: this.resultObject.has_more}))
        }
        localStorage.setItem('searchData', JSON.stringify(this.resultObject.items))
        this.store.dispatch(apiData({payload: this.resultObject.items}))
      })
  }
}
