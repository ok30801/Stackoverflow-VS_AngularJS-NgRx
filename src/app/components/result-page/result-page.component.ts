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
  isSorting = false
  sortingData: any

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

  sorting() {
    this.isSorting = !this.isSorting
    this.searchData$.subscribe(item => {
      const array = [...item]
      this.sortingData = array.sort((a: any, b: any) => {
        let nameA = a.owner.display_name.toLowerCase()
        let nameB = b.owner.display_name.toLowerCase()
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0
      })
    })
  }
}
