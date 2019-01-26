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
    [5, 10, 2, 11]
  ];

  labels = ['France', 'England', 'Mexico', 'China', 'Brazil'];

  counter = 0;

  data: number[] = [];

  html = `<bar-chart [data]="data" [labels]="labels" color="#e0e" width="600" height="500" title="My Bar Chart"></bar-chart>`;

  ngOnInit(): void {
    setTimeout(() => {
      this.data = this.datasets[0];
    }, 500);

    setInterval(() => {
      this.data = this.datasets[++this.counter % 4];
    }, 5000);
  }
}
