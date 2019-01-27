import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  html1 = '<bar-chart data="[1, 2, 3, 4]"></bar-chart>';
  html2 = `myData = [1, 2, 3, 4];
  <bar-chart [data]="myData"></bar-chart>`;
}
