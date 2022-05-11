import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogAuthorComponent } from '../../dialog/dialog-author/dialog-author.component';
import { DialogTagComponent } from '../../dialog/dialog-tag/dialog-tag.component';
import { ApiService } from '../../shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AnswerDataSelector, QuestionDataSelector } from '../../store/selectors/selectors';
import { addAnswerData, addAuthorData, addQuestionData, addTagData, apiData } from '../../store/actions/actions';
import { Router } from '@angular/router';
import { EventManager } from '@angular/platform-browser';
import { LoadingService } from '../../shared/services/loading.service';

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
  searchQuery: any
  loading$ = this.loader.loading$;

  constructor(
    public store: Store,
    private data: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private eventManager: EventManager,public loader: LoadingService,

  ) { }

  ngOnInit() {
    const questionDataLocal = JSON.parse(localStorage.getItem('questionData') || '{}')
    const answerDataLocal = JSON.parse(localStorage.getItem('questionData') || '{}')
    this.store.dispatch(addQuestionData({questionData: questionDataLocal}))
    this.store.dispatch(addAnswerData({answerData: answerDataLocal}))

    this.eventManager.addGlobalEventListener('window', 'keydown', (event:any) => {
      if(event.keyCode === 37 || event.keyCode == 8){
        this.searchQuery = JSON.parse(localStorage.getItem('searchQuery') || '{}')
        this.router.navigateByUrl(`result/query/${this.searchQuery.query}`)
      }
    });
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
  backspace() {
    this.searchQuery = JSON.parse(localStorage.getItem('searchQuery') || '{}')
    this.router.navigateByUrl(`result/query/${this.searchQuery.query}`)
  }
}
