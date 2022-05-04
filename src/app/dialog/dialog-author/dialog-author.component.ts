import {Component, OnDestroy, OnInit} from '@angular/core';
import {clearData, AuthorDataSelector, addAnswerData, addQuestionData, addTagData} from '../../reducers/api-data';
import { Store } from '@ngrx/store';
import {StackOverflowDataService} from "../../shared/services/stack-overflow-data.service";
import {DialogTagComponent} from "../dialog-tag/dialog-tag.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-author.component.html',
  styleUrls: ['./dialog-author.component.scss']
})
export class DialogAuthorComponent implements OnInit {

  public authorData$ = this.store.select(AuthorDataSelector)

  authorName: any
  resultQuestionData: any
  resultAnswerData: any
  resultTagData: any
  questionUrl: any

  constructor(
    public store: Store,
    private data: StackOverflowDataService,
    public dialog: MatDialog,
    private router: Router
    ){
  }

  ngOnInit(): void{
    this.authorName = this.store.select(AuthorDataSelector)
      .subscribe(item => {
        item ? this.authorName = item[0].owner.display_name : ''
      })

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

  close(){
    // this.store.dispatch(clearData())
  }

}
