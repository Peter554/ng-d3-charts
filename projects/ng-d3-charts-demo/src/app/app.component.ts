import { Component } from '@angular/core';
import { Dataset1D } from 'ng-d3-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Dataset1D = {
    values: [10, 15, 8, 25, 19]
  };
}
