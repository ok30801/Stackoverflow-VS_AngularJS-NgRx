import { Component, OnInit } from '@angular/core';
import { TagDataSelector, TagNameSelector } from '../../reducers/api-data';
import { Store } from '@ngrx/store';
import {OpenModalsService} from "../../shared/services/open-modals.service";

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.scss']
})
export class DialogTagComponent implements OnInit {

  public tagData$ = this.store.select(TagDataSelector)
  public tagName$ = this.store.select(TagNameSelector)


  constructor(public store: Store, private openModal: OpenModalsService){ }

  ngOnInit(): void{ }

  handleClickAuthor(id: number) {
    this.openModal.handleClickAuthor(id)
  }

  handleClickTheme(id: number) {
    this.openModal.handleClickTheme(id)
  }
}
