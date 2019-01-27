import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scatter-chart-demo',
  templateUrl: './scatter-chart-demo.component.html',
  styleUrls: ['./scatter-chart-demo.component.css']
})
export class ScatterChartDemoComponent implements OnInit {

  title = 'My Scatter Chart';

  datasets = [
    [[-3, 1], [-2, 4], [-1, 6], [0, 2], [1, 0], [2, -1], [3, 1], [4, 2], [5, 4], [6, 3]],
    [[-3, -1], [-2, 2], [-1, 5], [0, 4], [1, 1], [2, 0], [3, 3], [4, 7], [5, 3], [6, -1]],
    [[-3, 4], [-2, 7], [-1, 4], [0, 1], [1, -3], [2, 2], [3, 0], [4, 6], [5, 5], [6, 9]]
  ];

  colors = ['#e0e', '#0ee', '#ee0'];

  data: number[][] = [];
  color = '';

  dataCounter = 0;
  colorCounter = 0;

  exampleCode = `data = [[-3, 1], [-2, 4], [-1, 6], [0, 2], [1, 0], [2, -1], [3, 1], [4, 2], [5, 4], [6, 3]];

<scatter-chart [data]="data" title="My Scatter Chart" xLabel="Score A" yLabel="Score B" color="#e0e"></scatter-chart>`;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.data = this.datasets[0];
      this.color = this.colors[0];
    }, 100);

    setInterval(() => {
      this.data = this.datasets[++this.dataCounter % this.datasets.length];
    }, 5000);

    setInterval(() => {
      this.color = this.colors[++this.colorCounter % this.colors.length];
    }, 5000 * this.datasets.length);
  }

}
