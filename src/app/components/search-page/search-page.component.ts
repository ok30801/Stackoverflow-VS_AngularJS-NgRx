import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StackOverflowDataService } from "../../shared/services/stack-overflow-data.service";
import { HttpClient } from '@angular/common/http';
import { addStackOverflowData } from '../../reducers/stackOverflowData';
import { Store } from '@ngrx/store';


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
    private data: StackOverflowDataService,
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
    } /*else {
      this.router.navigateByUrl(`result/query/${this.form.value.searchPhrase}`)
        .then(() => this.data.getStackOverflowData(this.form.value.searchPhrase))
    }*/
    this.fetchStackOverflowData()
  }

  fetchStackOverflowData() {
    this.data.fetchStackOverflowData(this.form.value.searchPhrase)
      .subscribe(item => {
        this.resultObject = item
        this.store.dispatch(addStackOverflowData({payload: this.resultObject.items}))
      })
    // this.store.dispatch(addStackOverflowData({payload: this.test as DataTest[]}))
    // console.log('this.resultObject', this.resultObject)

  }
}
