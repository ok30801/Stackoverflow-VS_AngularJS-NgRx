import { Component, OnInit } from '@angular/core';
import { AuthorDataSelector, clearData, TagDataSelector, TagNameSelector } from '../../reducers/api-data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.scss']
})
export class DialogTagComponent implements OnInit {

  public tagData$ = this.store.select(TagDataSelector)
  public tagName$ = this.store.select(TagNameSelector)

  constructor(public store: Store){

  }

  ngOnInit(): void{}

  handleClickTheme(){

  }

  handleClickAnswers(){

  }

  handleClickTag(){

  }

  close(){
    this.store.dispatch(clearData())
  }
}
