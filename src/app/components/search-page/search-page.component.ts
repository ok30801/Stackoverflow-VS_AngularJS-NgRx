import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StackOverflowData } from "../../shared/services/stack-overflow-data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  focused!: true
  form!: FormGroup
  formError = false

  constructor( private router: Router, private data: StackOverflowData ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      searchPhrase: new FormControl('', [Validators.required])
    })
  }
  handleSearch() {
    if (this.form.invalid) {
      this.formError = true
    } else {
      this.fetchStackOverflowData()
      // this.router.navigate(['/result'])
    }
  }

  fetchStackOverflowData() {
    this.data.fetchStackOverflowData()
      .subscribe(data => {
        console.log('data', data)
      })
  }
}
