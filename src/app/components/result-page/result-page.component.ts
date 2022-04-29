import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StackOverflowDataSelector } from '../../reducers/stackOverflowData';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  focused!: true
  form!: FormGroup
  formError = false
  searchUrl: any

  public searchData$ = this.store.select(StackOverflowDataSelector)

  constructor( public store: Store ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      searchPhrase: new FormControl('', [Validators.required])
    })
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
