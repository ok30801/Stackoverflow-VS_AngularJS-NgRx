import {Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OpenModalsService } from '../../shared/services/open-modals.service';
import { AuthorDataSelector, StackOverflowDataSelector } from '../../store/selectors/selectors';
import { SortingService } from '../../shared/services/sorting.service';

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

  public searchData$ = this.store.select(StackOverflowDataSelector)

  constructor(public store: Store, private openModal: OpenModalsService, private sorting: SortingService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      searchPhrase: new FormControl('', [Validators.required])
    })
  }

  handleSearch() { }

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
