import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import {
  addAuthorData,
  addTagData,
  AuthorDataSelector,
  StackOverflowDataSelector,
  TagDataSelector
} from '../../reducers/api-data';
import { StackOverflowDataService } from '../../shared/services/stack-overflow-data.service';
import { DialogAuthorComponent } from '../../dialog/dialog-author/dialog-author.component';
import { DialogTagComponent } from '../../dialog/dialog-tag/dialog-tag.component';

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

  public searchData$ = this.store.select(StackOverflowDataSelector)
  public authorData$ = this.store.select(AuthorDataSelector)

  constructor(
    public store: Store,
    public dialog: MatDialog,
    private data: StackOverflowDataService,

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

  handleClickTheme() {

  }
  handleClickAnswers() {

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
