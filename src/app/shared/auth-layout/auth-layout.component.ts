import { Component, OnInit } from '@angular/core';
import { slider } from '../services/route-animations';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  animations: [
    slider,
  ]
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  getDepth(outlet: any) {
    return outlet.activatedRouteData['depth'];
  }

}
