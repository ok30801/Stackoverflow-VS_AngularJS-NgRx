import { Component } from '@angular/core';
import {slider} from './route-animations/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slider,
    // myAnimation
  ]
})
export class AppComponent {
  title = 'stackoverflow-vs';

  getDepth(outlet: any) {
    return outlet.activatedRouteData['depth'];
  }
}
