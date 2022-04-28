import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { StackOverflowDataService } from '../../shared/services/stack-overflow-data.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { addStackOverflowData } from '../../reducers/stackOverflowData';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  private resultObject: Subscription

  focused!: true
  form!: FormGroup
  formError = false
  searchUrl: any
  searchData: any

  constructor( private router: Router, private data: StackOverflowDataService, private store: Store ) {
    this.resultObject = this.data.search$.subscribe((searchUrl: any) => {
      console.log('searchUrl', searchUrl) // Observable {source: Observable, operator: ƒ}
      this.searchUrl = searchUrl
      this.searchUrl.subscribe((searchData: object) => {
        this.searchData = searchData
        console.log('this.searchData', this.searchData)
      })
    })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      searchPhrase: new FormControl('', [Validators.required])
    })

    console.log('this.data.search$', this.data.search$)
    // this.store.dispatch(addStackOverflowData(item))

  }
  handleSearch() {
    // if (this.form.invalid) {
    //   this.formError = true
    // } else {
    //   this.router.navigateByUrl(`result/query/${this.form.value.searchPhrase}`)
    //     .then(() => this.data.getStackOverflowData(this.form.value))
    // }
  }
}
