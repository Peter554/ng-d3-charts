import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { BarChartDataItem } from '../../models/bar-chart-data-item';

@Component({
  selector: 'ndc-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input()
  data: BarChartDataItem[] = [];
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
    const update = this.svg
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('fill', this.color)
      .attr('x', (d, i) => (i * 100) / this.data.length)
      .attr('y', d => 100 - this.yScale(d.value))
      .attr('width', 100 / this.data.length)
      .attr('height', d => this.yScale(d.value));
  }

  buildScaleY() {
    const values = this.data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    this.yScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, 100]);
  }
}
