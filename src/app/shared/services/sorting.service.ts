import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthorDataSelector, StackOverflowDataSelector } from '../../store/selectors/selectors';
import { addStackOverflowData } from '../../store/actions/actions';


@Injectable({ providedIn: 'root' })
export class SortingService {

  sortingData = <any>[]

  public searchData$ = this.store.select(StackOverflowDataSelector)
  public authorData$ = this.store.select(AuthorDataSelector)

  constructor( public store: Store ) {}

  sortingAuthorTheme(isSorting: boolean) {
    this.searchData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
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
        this.sortingData = array.sort((a: any, b: any) => {
          const nameA = a.owner.display_name.toLowerCase()
          const nameB = b.owner.display_name.toLowerCase()
          if (nameA > nameB)
            return -1
          if (nameA < nameB)
            return 1
          return 0
        })
      }
    })
    this.store.dispatch(addStackOverflowData({payload: this.sortingData}))
  }

  sortingAnswers(isSorting: boolean) {
    this.searchData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
        this.sortingData = array.sort((a: any, b: any) => a.answer_count - b.answer_count)
      } else {
        this.sortingData = array.sort((a: any, b: any) => b.answer_count - a.answer_count)
      }
    })
    this.store.dispatch(addStackOverflowData({payload: this.sortingData}))
  }

  sortingTags(isSorting: boolean) {
    this.searchData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
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
        this.sortingData = array.sort((a: any, b: any) => {
          const nameA = a.tags[0].toLowerCase()
          const nameB = b.tags[0].toLowerCase()
          if (nameA > nameB)
            return -1
          if (nameA < nameB)
            return 1
          return 0
        })
      }
    })
    this.store.dispatch(addStackOverflowData({payload: this.sortingData}))
  }
}
