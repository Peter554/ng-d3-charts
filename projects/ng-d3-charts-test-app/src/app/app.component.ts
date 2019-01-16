import { Component } from '@angular/core';
import { BarChartDataItem } from 'ng-d3-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: BarChartDataItem[] = [
    {
      label: 'England',
      value: 23
    },
    {
      label: 'Russia',
      value: 11
    },
    {
      label: 'Ireland',
      value: 45
    },
    {
      label: 'Mexico',
      value: 19
    },
    {
      label: 'France',
      value: 30
    }
  ];
}
