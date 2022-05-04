import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OpenModalsService } from '../../shared/services/open-modals.service';
import { AuthorDataSelector } from '../../store/selectors/selectors';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-author.component.html',
  styleUrls: ['./dialog-author.component.scss']
})
export class DialogAuthorComponent implements OnInit {

  public authorData$ = this.store.select(AuthorDataSelector)

  authorName: any

  constructor(public store: Store, private openModal: OpenModalsService){ }

  ngOnInit(): void{
    this.authorName = this.store.select(AuthorDataSelector)
      .subscribe(item => {
        item ? this.authorName = item[0].owner.display_name : ''
      })
  }

  handleClickTheme(id: number) {
    this.openModal.handleClickTheme(id)
  }

  handleClickTag(id: string) {
    this.openModal.handleClickTag(id)
  }
}
