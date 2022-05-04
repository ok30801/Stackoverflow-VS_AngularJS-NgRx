import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import {
  addAuthorData,
  addTagData,
  addQuestionData,
  addAnswerData,
  AuthorDataSelector,
  StackOverflowDataSelector,
} from '../../reducers/api-data';
import { StackOverflowDataService } from '../../shared/services/stack-overflow-data.service';
import { DialogAuthorComponent } from '../../dialog/dialog-author/dialog-author.component';
import { DialogTagComponent } from '../../dialog/dialog-tag/dialog-tag.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  focused!: true
  form!: FormGroup
  formError = false
  searchUrl: any
  resultAuthorData: any
  resultTagData: any
  resultQuestionData: any
  resultAnswerData: any
  questionUrl: any

  public searchData$ = this.store.select(StackOverflowDataSelector)
  public authorData$ = this.store.select(AuthorDataSelector)

  constructor(
    public store: Store,
    public dialog: MatDialog,
    private data: StackOverflowDataService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      searchPhrase: new FormControl('', [Validators.required])
    })
  }
  handleSearch() {
    // if (this.form.invalid) {
    //   this.formError = true
    // } else {
    //   this.router.navigateByUrl(`result/query/${this.form.value.searchPhrase}`)
    //     .then(() => this.data.getStackOverflowData(this.form.value))
    // }
  }
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
}
