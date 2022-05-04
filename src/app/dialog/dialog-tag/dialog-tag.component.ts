import { Component, OnInit } from '@angular/core';
import {
  addAnswerData,
  addAuthorData, addQuestionData,
  AuthorDataSelector,
  clearData,
  TagDataSelector,
  TagNameSelector
} from '../../reducers/api-data';
import { Store } from '@ngrx/store';
import {DialogAuthorComponent} from "../dialog-author/dialog-author.component";
import {StackOverflowDataService} from "../../shared/services/stack-overflow-data.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.scss']
})
export class DialogTagComponent implements OnInit {

  public tagData$ = this.store.select(TagDataSelector)
  public tagName$ = this.store.select(TagNameSelector)

  resultAuthorData: any
  resultAnswerData: any
  resultQuestionData: any
  questionUrl: any

  constructor(
    public store: Store,
    private data: StackOverflowDataService,
    public dialog: MatDialog,
    private router: Router,
    ){

  }

  ngOnInit(): void{
    this.tagData$.subscribe(item => console.log('item^^^^', item))
  }

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

  close(){
    // this.store.dispatch(clearData())
  }
}
