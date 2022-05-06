import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OpenModalsService } from '../../shared/services/open-modals.service';
import { TagDataSelector, TagNameSelector } from '../../store/selectors/selectors';
import {SortingService} from '../../shared/services/sorting.service';

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.scss']
})
export class DialogTagComponent implements OnInit {

  public tagData$ = this.store.select(TagDataSelector)
  public tagName$ = this.store.select(TagNameSelector)

  isSortingName = false
  isSortingTheme = false
  isSortingAnswers = false
  isSortingTags = false


  constructor(public store: Store, private openModal: OpenModalsService, private sorting: SortingService){ }

  ngOnInit(): void{ }

  handleClickAuthor(id: number) {
    this.openModal.handleClickAuthor(id)
  }

  handleClickTheme(id: number) {
    this.openModal.handleClickTheme(id)
  }

  sortingName() {
    this.isSortingTheme = !this.isSortingTheme
    this.sorting.sortingAuthorModalTags(this.isSortingTheme)
  }

  sortingTheme() {
    this.isSortingTheme = !this.isSortingTheme
    this.sorting.sortingThemeModalTags(this.isSortingTheme)
  }
  sortingAnswers() {
    this.isSortingAnswers = !this.isSortingAnswers
    this.sorting.sortingAnswersModalTags(this.isSortingAnswers)
  }
}
