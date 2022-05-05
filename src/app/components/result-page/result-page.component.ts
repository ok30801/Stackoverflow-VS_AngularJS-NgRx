import {Component, OnInit, Pipe} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OpenModalsService } from '../../shared/services/open-modals.service';
import { AuthorDataSelector, StackOverflowDataSelector } from '../../store/selectors/selectors';

// @Pipe({name: 'sortArrayOfCustomObjects'})

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit  {

  focused!: true
  form!: FormGroup
  formError = false
  sortingData!: any[]
  isSortingName = false
  isSortingTheme = false
  isSortingAnswers = false
  isSortingTags = false

  public searchData$ = this.store.select(StackOverflowDataSelector)
  public authorData$ = this.store.select(AuthorDataSelector)

  constructor(public store: Store, private openModal: OpenModalsService) { }

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
    this.searchData$.subscribe(item => {
      const array = [...item]
      if (this.isSortingName) {
        this.sortingData = array.sort((a: any, b: any) => {
          const nameA = a.owner.display_name.toLowerCase()
          const nameB = b.owner.display_name.toLowerCase()
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        })
      } else {
        this.sortingData = [...item]
      }
    })
  }

  sortingTheme() {
    this.isSortingTheme = !this.isSortingTheme
    this.searchData$.subscribe(item => {
      const array = [...item]
      if (this.isSortingTheme) {
        this.sortingData = array.sort((a: any, b: any) => {
          const nameA = a.title.toLowerCase()
          const nameB = b.title.toLowerCase()
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        })
      } else {
        this.sortingData = [...item]
      }
    })
  }
  sortingAnswers() {
    this.isSortingAnswers = !this.isSortingAnswers
    this.searchData$.subscribe(item => {
      const array = [...item]
      if (this.isSortingAnswers) {
        this.sortingData = array.sort((a: any, b: any) => a.answer_count - b.answer_count)
      } else {
        this.sortingData = [...item]
      }
    })
  }
  sortingTags() {
    this.isSortingTags = !this.isSortingTags
    this.searchData$.subscribe(item => {
      const array = [...item]
      if (this.isSortingTags) {
        this.sortingData = array.sort((a: any, b: any) => {
          const nameA = a.tags[0].toLowerCase()
          const nameB = b.tags[0].toLowerCase()
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        })
      } else {
        this.sortingData = [...item]
      }
    })
  }
}
