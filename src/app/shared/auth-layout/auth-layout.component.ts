import { Component, OnInit } from '@angular/core';
import { slider, myAnimation} from '../services/route-animations';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  animations: [
    slider,
    // myAnimation
  ]
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  getDepth(outlet: any) {
    return outlet.activatedRouteData['depth'];
  }

}
