import { Component, OnInit } from '@angular/core';
import { slider, myAnimation } from '../services/route-animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    slider,
    // myAnimation
  ]
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  getDepth(outlet: any) {
    return outlet.activatedRouteData['depth'];
  }
}
