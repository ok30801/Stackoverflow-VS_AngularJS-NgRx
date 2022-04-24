import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../shared/users.service';
import {LocalstorageService} from '../../shared/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth = false
  userData = ''
  firstChar = ''

  constructor(private localstorageService: LocalstorageService,) {}

  ngOnInit(): void {
    this.userData = <string>localStorage.getItem('userData')
    this.userData ? this.auth = true : false
  }

  // getDataLocalStorage() {
  //
  //   console.log('777', this.localstorageService.getDataLocalStorage())
  //   this.localstorageService.getDataLocalStorage()
  //     .subscribe(item => {
  //       if (Object.entries(item)) {
  //         this.auth = true
  //       }
  //     })
  // }
}
