import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {DialogAuthorComponent} from '../../dialog/dialog-author/dialog-author.component';
import {DialogTagComponent} from '../../dialog/dialog-tag/dialog-tag.component';
import {StackOverflowDataService} from '../../shared/services/stack-overflow-data.service';
import {MatDialog} from '@angular/material/dialog';
import {AnswerDataSelector, QuestionDataSelector} from '../../store/selectors/selectors';
import {addAuthorData, addTagData} from '../../store/actions/actions';

@Component({
  selector: 'app-theme-page',
  templateUrl: './theme-page.component.html',
  styleUrls: ['./theme-page.component.scss']
})
export class ThemePageComponent implements OnInit {

  public questionData$ = this.store.select(QuestionDataSelector)
  public answerData$ = this.store.select(AnswerDataSelector)

  resultAuthorData: any
  resultTagData: any

  constructor(public store: Store, private data: StackOverflowDataService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  handleClickAuthor(id: number) {
    this.data.getAuthorData(id)
      .subscribe(item => {
        this.resultAuthorData = item
        this.store.dispatch(addAuthorData({payload: this.resultAuthorData.items}))
      })
    this.dialog.open(DialogAuthorComponent);
  }

  handleClickTag(tag: string) {
    this.data.getTagData(tag)
      .subscribe(item => {
        this.resultTagData = item
        this.store.dispatch(addTagData({tagData: this.resultTagData.items, tagName: tag}))
      })
    this.dialog.open(DialogTagComponent);
  }
}
