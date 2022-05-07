import {Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OpenModalsService } from '../../shared/services/open-modals.service';
import { StackOverflowDataSelector } from '../../store/selectors/selectors';
import { SortingService } from '../../shared/services/sorting.service';
import {apiData} from '../../store/actions/actions';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit  {

  focused!: true
  form!: FormGroup
  formError = false
  searchQuery: any
  isSortingName = false
  isSortingTheme = false
  isSortingAnswers = false
  isSortingTags = false
  resultObject: any


  public searchData$ = this.store.select(StackOverflowDataSelector)

  constructor(
    public store: Store,
    private openModal: OpenModalsService,
    private sorting: SortingService,
    private data: ApiService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      searchPhrase: new FormControl('', [Validators.required])
    })
    this.searchQuery = JSON.parse(localStorage.getItem('searchQuery') || '{}')
    this.form.controls['searchPhrase'].setValue(this.searchQuery.query)
    const searchDataLocal = JSON.parse(localStorage.getItem('searchData') || '{}')
    this.store.dispatch(apiData({payload: searchDataLocal}))
  }

  handleSearch() {
    if (this.form.invalid) this.formError = true
    this.getStackOverflowData()
    const searchQuery = {query: this.form.value.searchPhrase}
    localStorage.setItem('searchQuery', JSON.stringify(searchQuery))
  }

  getStackOverflowData() {
    this.data.getStackOverflowData(this.form.value.searchPhrase)
      .subscribe(item => {
        this.resultObject = item
        localStorage.setItem('searchData', JSON.stringify(this.resultObject.items))
        this.store.dispatch(apiData({payload: this.resultObject.items}))
      })
  }


  handleClickAuthor(id: number) {
    this.openModal.handleClickAuthor(id)
  }

  handleClickTheme(id: number) {
    this.openModal.handleClickTheme(id)
  }

  handleClickTag(id: string) {
    this.openModal.handleClickTag(id)
  }

  sortingName() {
    this.isSortingName = !this.isSortingName
    this.sorting.sortingAuthor(this.isSortingName)
  }

  sortingTheme() {
    this.isSortingTheme = !this.isSortingTheme
    this.sorting.sortingTheme(this.isSortingTheme)
  }

  sortingAnswers() {
    this.isSortingAnswers = !this.isSortingAnswers
    this.sorting.sortingAnswers(this.isSortingAnswers)
  }

  sortingTags() {
    this.isSortingTags = !this.isSortingTags
    this.sorting.sortingTags(this.isSortingTags)
  }
}
