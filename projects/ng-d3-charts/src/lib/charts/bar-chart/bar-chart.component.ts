import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Dataset1D } from '../../models/Dataset1D';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input()
  data: Dataset1D = { values: [] };
  @Input()
  width = '500px';
  @Input()
  height = '500px';
  @Input()
  color = '#444';

  svg;
  yScale;

  constructor() {}

  ngOnInit() {
    this.svg = d3
      .select('#bar-chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('preserveAspectRatio', 'none')
      .attr('viewBox', `0 0 100 100`);

    this.buildScaleY();
    this.render();
  }

  render() {
    this.svg
      .selectAll('rect')
      .data(this.data.values)
      .enter()
      .append('rect')
      .attr('fill', this.color)
      .attr('x', (d, i) => (i * 100) / this.data.values.length)
      .attr('y', d => 100 - this.yScale(d))
      .attr('width', 100 / this.data.values.length)
      .attr('height', d => this.yScale(d));
  }

  buildScaleY() {
    const minValue = Math.min(...this.data.values);
    const maxValue = Math.max(...this.data.values);
    this.yScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, 100]);
  }
}
