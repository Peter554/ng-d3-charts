import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  html1 = '<bar-chart title="My Bar Chart"></bar-chart>';
  html2 = `title = 'My Bar Chart';
<bar-chart [title]="title"></bar-chart>`;
}
