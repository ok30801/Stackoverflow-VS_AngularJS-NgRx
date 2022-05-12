import { Component, OnInit } from '@angular/core';
import { slider } from '../services/route-animations';
import { clearDataDialogAuthor, isSuccessSearch } from '../../store/actions/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    slider
  ]
})
export class MainLayoutComponent implements OnInit {

  constructor(public store: Store) { }

  public firstCharUserEmail = ''

  ngOnInit(): void {
    const userEmail = JSON.parse(localStorage.getItem('userData') || '{}')
    this.firstCharUserEmail = userEmail.userEmail.slice(0,1)
  }

  getDepth(outlet: any) {
    return outlet.activatedRouteData['depth'];
  }
  logout() {
    localStorage.clear();
    this.store.dispatch(clearDataDialogAuthor())
    this.store.dispatch(isSuccessSearch({payload: false}))
  }
}
