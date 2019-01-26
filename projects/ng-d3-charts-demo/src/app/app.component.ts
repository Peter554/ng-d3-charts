import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  datasets = [
    [10, 15, 8, 25, 19],
    [15, 6, 33, 12, 25],
    [22, 40, 16, 34, 3],
    // [5, 10, 2, 11],
    // [4, 17, 9, 1],
    // [9, 5, 3, 12]
  ];

  labelss = [
    ['France', 'England', 'Mexico', 'China', 'Brazil'],
    ['Beef', 'Pork', 'Chicken', 'Lamb', 'Fish']
  ];

  colors = ['#e0e', '#0ee', '#ee0'];

  titles = [
    'My Bar Chart',
    'A Nice Bar Chart'
  ];

  dataCounter = 0;
  labelsCounter = 0;
  titleCounter = 0;
  colorCounter = 0;

  data: number[] = [];
  labels: string[] = [];
  title = '';
  color = '';

  html = `<bar-chart [data]="data" [labels]="labels" color="#e0e" width="600" height="500" title="My Bar Chart"></bar-chart>`;

  ngOnInit(): void {
    setTimeout(() => {
      this.data = this.datasets[0];
      this.labels = this.labelss[0];
      this.color = this.colors[0];
      this.title = this.titles[0];
    }, 100);

    setInterval(() => {
      this.data = this.datasets[++this.dataCounter % this.datasets.length];
    }, 5000);

    // setInterval(() => {
    //   this.labels = this.labelss[++this.labelsCounter % this.labelss.length];
    // }, 8000);

    setInterval(() => {
      this.color = this.colors[++this.colorCounter % this.colors.length];
    }, 5000 * this.datasets.length);

    // setInterval(() => {
    //   this.title = this.titles[++this.titleCounter % this.titles.length];
    // }, 15000);
  }
}
