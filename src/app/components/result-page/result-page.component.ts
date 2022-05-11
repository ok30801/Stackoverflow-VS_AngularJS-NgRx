import {Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OpenModalsService } from '../../shared/services/open-modals.service';
import {IsSuccessSearchSelector, SearchQuerySelector, StackOverflowDataSelector} from '../../store/selectors/selectors';
import { SortingService } from '../../shared/services/sorting.service';
import {addSearchQuery, apiData, isSuccessSearch} from '../../store/actions/actions';
import { ApiService } from '../../shared/services/api.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit  {

  focused!: true
  form!: FormGroup
  formError = false
  isSortingName = false
  isSortingTheme = false
  isSortingAnswers = false
  isSortingTags = false
  resultObject: any
  hideMassage: any
  loading$ = this.loader.loading$;

  public searchData$ = this.store.select(StackOverflowDataSelector)
  public IsSuccessSearchSelector$ = this.store.select(IsSuccessSearchSelector)
  public SearchQuerySelector$ = this.store.select(SearchQuerySelector)

  constructor(
    public store: Store,
    private openModal: OpenModalsService,
    private sorting: SortingService,
    private data: ApiService,
    public loader: LoadingService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      searchPhrase: new FormControl('', [Validators.required])
    })
    const searchQuery = JSON.parse(localStorage.getItem('searchQuery') || '{}')
    this.form.controls['searchPhrase'].setValue(searchQuery.query)
    this.IsSuccessSearchSelector$.subscribe(data => this.hideMassage = data)
    this.store.dispatch(addSearchQuery({payload: searchQuery.query}))
    const searchDataLocal = JSON.parse(localStorage.getItem('searchData') || '{}')
    this.store.dispatch(apiData({payload: searchDataLocal}))
  }

  handleSearch() {
    if (this.form.invalid) this.formError = true
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
