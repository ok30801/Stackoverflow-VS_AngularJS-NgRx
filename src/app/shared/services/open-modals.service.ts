import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { DialogAuthorComponent } from '../../dialog/dialog-author/dialog-author.component';
import { DialogTagComponent } from '../../dialog/dialog-tag/dialog-tag.component';
import { addAnswerData, addAuthorData, addQuestionData, addTagData } from '../../store/actions/actions';


@Injectable({ providedIn: 'root' })
export class OpenModalsService {

  resultAuthorData: any
  resultQuestionData: any
  resultAnswerData: any
  resultTagData: any
  questionUrl: any

  constructor(
    public store: Store,
    public dialog: MatDialog,
    private data: ApiService,
    private router: Router,
  ) { }

  handleClickAuthor(id: number) {
    this.data.getAuthorData(id)
      .subscribe(item => {
        this.resultAuthorData = item
        this.store.dispatch(addAuthorData({payload: this.resultAuthorData.items}))
      })
    this.dialog.open(DialogAuthorComponent);
  }

  handleClickTheme(id: number) {
    this.data.getQuestionData(id)
    this.data.getAnswerData(id)
      .subscribe(item => {
        this.resultAnswerData = item
        this.store.dispatch(addAnswerData({answerData: this.resultAnswerData.items}))
      })
    this.data.getQuestionData(id)
      .subscribe(item => {
        this.resultQuestionData = item
        this.questionUrl = this.resultQuestionData.items[0].link.slice(36)
        this.store.dispatch(addQuestionData({questionData: this.resultQuestionData.items}))
        this.router.navigateByUrl(`question/${this.questionUrl}`)
      })
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
