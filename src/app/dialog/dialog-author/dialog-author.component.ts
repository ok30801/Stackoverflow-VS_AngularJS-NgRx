import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OpenModalsService } from '../../shared/services/open-modals.service';
import { AuthorDataSelector } from '../../store/selectors/selectors';
import { SortingService } from '../../shared/services/sorting.service';
import { clearDataDialogAuthor } from '../../store/actions/actions';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-author.component.html',
  styleUrls: ['./dialog-author.component.scss']
})
export class DialogAuthorComponent implements OnInit {

  public authorData$ = this.store.select(AuthorDataSelector)

  authorName: any
  avatar: any
  isSortingTheme = false
  isSortingAnswers = false
  isSortingTags = false

  constructor(public store: Store, private openModal: OpenModalsService, private sorting: SortingService){ }

  ngOnInit(): void{
    this.authorName = this.store.select(AuthorDataSelector)
      .subscribe(data => {
        if (data) {
          this.authorName = data[0].owner.display_name
          this.avatar = data[0].owner.profile_image
        }
      })
  }

  handleClickTheme(id: number) {
    this.openModal.handleClickTheme(id)
  }

  handleClickTag(id: string) {
    this.openModal.handleClickTag(id)
  }

  sortingTheme() {
    this.isSortingTheme = !this.isSortingTheme
    this.sorting.sortingThemeModal(this.isSortingTheme)
  }
  sortingAnswers() {
    this.isSortingAnswers = !this.isSortingAnswers
    this.sorting.sortingAnswersModal(this.isSortingAnswers)
  }
  sortingTags() {
    this.isSortingTags = !this.isSortingTags
    this.sorting.sortingTagsModal(this.isSortingTags)
  }
  close() {
    this.store.dispatch(clearDataDialogAuthor())
  }
}
