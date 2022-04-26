import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  getDepth(outlet: any) {
    return outlet.activatedRouteData['depth'];
  }
}
