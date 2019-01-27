import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart-demo',
  templateUrl: './bar-chart-demo.component.html',
  styleUrls: ['./bar-chart-demo.component.css']
})
export class BarChartDemoComponent implements OnInit {
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

  exampleCode = `data = [10, 15, 8, 25, 19];
labels = ['France', 'England', 'Mexico', 'China', 'Brazil'];

<bar-chart [data]="data" [labels]="labels" color="#e0e" title="My Bar Chart"></bar-chart>`;

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

    setInterval(() => {
      this.color = this.colors[++this.colorCounter % this.colors.length];
    }, 5000 * this.datasets.length);
  }
}
