import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthorDataSelector,
  StackOverflowDataSelector,
  TagDataSelector,
  TagNameSelector
} from '../../store/selectors/selectors';
import {addAuthorData, addStackOverflowData, addTagData} from '../../store/actions/actions';


@Injectable({ providedIn: 'root' })
export class SortingService {

  sortingData = <any>[]

  public searchData$ = this.store.select(StackOverflowDataSelector)
  public authorData$ = this.store.select(AuthorDataSelector)
  public tagData$ = this.store.select(TagDataSelector)
  public tagName$ = this.store.select(TagNameSelector)

  constructor( public store: Store ) {}

  /* Sorting in main table */

  sortingAuthor(isSorting: boolean) {
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

  sortingTheme(isSorting: boolean) {
    this.searchData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
        this.sortingData = array.sort((a: any, b: any) => {
          if (a.title.toLowerCase() < b.title.toLowerCase())
            return -1
          if (a.title.toLowerCase() > b.title.toLowerCase())
            return 1
          return 0
        })
      } else {
        this.sortingData = array.sort((a: any, b: any) => {
          if (a.title.toLowerCase() > b.title.toLowerCase())
            return -1
          if (a.title.toLowerCase() < b.title.toLowerCase())
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

  /* Sorting in modals author*/

  sortingThemeModal(isSorting: boolean) {
    this.authorData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
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
        this.sortingData = array.sort((a: any, b: any) => {
          const nameA = a.title.toLowerCase()
          const nameB = b.title.toLowerCase()
          if (nameA > nameB)
            return -1
          if (nameA < nameB)
            return 1
          return 0
        })
      }
    })
    this.store.dispatch(addAuthorData({payload: this.sortingData}))
  }

  sortingAnswersModal(isSorting: boolean) {
    this.authorData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
        this.sortingData = array.sort((a: any, b: any) => a.answer_count - b.answer_count)
      } else {
        this.sortingData = array.sort((a: any, b: any) => b.answer_count - a.answer_count)
      }
    })
    this.store.dispatch(addAuthorData({payload: this.sortingData}))
  }

  sortingTagsModal(isSorting: boolean) {
    this.authorData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
        this.sortingData = array.sort((a: any, b: any) => {
          if (a.tags[0].toLowerCase() < b.tags[0].toLowerCase())
            return -1
          if (a.tags[0].toLowerCase() > b.tags[0].toLowerCase())
            return 1
          return 0
        })
      } else {
        this.sortingData = array.sort((a: any, b: any) => {
          if (a.tags[0].toLowerCase() > b.tags[0].toLowerCase())
            return -1
          if (a.tags[0].toLowerCase() < b.tags[0].toLowerCase())
            return 1
          return 0
        })
      }
    })
    this.store.dispatch(addAuthorData({payload: this.sortingData}))
  }

  /* Sorting in modals tags */

  sortingAuthorModalTags(isSorting: boolean) {
    this.tagData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
        this.sortingData = array.sort((a: any, b: any) => {
          if (a.owner.display_name.toLowerCase() < b.owner.display_name.toLowerCase())
            return -1
          if (a.owner.display_name.toLowerCase() > b.owner.display_name.toLowerCase())
            return 1
          return 0
        })
      } else {
        this.sortingData = array.sort((a: any, b: any) => {
          if (a.owner.display_name.toLowerCase() > b.owner.display_name.toLowerCase())
            return -1
          if (a.owner.display_name.toLowerCase() < b.owner.display_name.toLowerCase())
            return 1
          return 0
        })
      }
    })
    this.store.dispatch(addTagData({tagData: this.sortingData, tagName: 'Test'}))
  }

  sortingThemeModalTags(isSorting: boolean) {
    this.tagData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
        this.sortingData = array.sort((a: any, b: any) => {
          if (a.title.toLowerCase() < b.title.toLowerCase())
            return -1
          if (a.title.toLowerCase() > b.title.toLowerCase())
            return 1
          return 0
        })
      } else {
        this.sortingData = array.sort((a: any, b: any) => {
          if (a.title.toLowerCase() > b.title.toLowerCase())
            return -1
          if (a.title.toLowerCase() < b.title.toLowerCase())
            return 1
          return 0
        })
      }
    })
    this.store.dispatch(addTagData({tagData: this.sortingData, tagName: 'Test'}))
  }

  sortingAnswersModalTags(isSorting: boolean) {
    this.tagData$.subscribe(item => {
      const array = [...item]
      if (isSorting) {
        this.sortingData = array.sort((a: any, b: any) => a.answer_count - b.answer_count)
      } else {
        this.sortingData = array.sort((a: any, b: any) => b.answer_count - a.answer_count)
      }
    })
    this.store.dispatch(addTagData({tagData: this.sortingData, tagName: 'Test'}))
  }

}
