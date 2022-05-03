import { Component, OnInit } from '@angular/core';
import { clearData, AuthorDataSelector } from '../../reducers/api-data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-author.component.html',
  styleUrls: ['./dialog-author.component.scss']
})
export class DialogAuthorComponent implements OnInit {

  public authorData$ = this.store.select(AuthorDataSelector)

  authorName: any

  constructor(public store: Store){

  }

  ngOnInit(): void{
    this.authorName = this.store.select(AuthorDataSelector)
      .subscribe(item => {
        item ? this.authorName = item[0].owner.display_name : ''
      })
  }

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
