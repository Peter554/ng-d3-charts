import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges {
  @Input()
  data: number[] = [];
  @Input()
  labels: string[] = [];
  @Input()
  width = 800;
  @Input()
  height = 600;
  @Input()
  color = '#e0e';
  @Input()
  title = '';

  firstChange = true;

  svg;
  padding;
  yScale;
  xScale;
  colorScale;
  yAxis;

  ngOnChanges(changes: SimpleChanges) {
    if (this.firstChange) {
      this.firstChange = false;
      this.buildSvg();
      if (this.data.length > 0) {
        this.prepareChart();
        this.updateChart();
      }
    } else if (changes.labels
      || (changes.data && (changes.data.previousValue.length !== changes.data.currentValue.length))
    ) {
      this.svg.selectAll('*').remove();
      this.prepareChart();
      this.updateChart();
    } else {
      this.updateChart();
    }
  }

  prepareChart() {
    const availableWidth = document.getElementById('bar-chart').clientWidth;
    if (this.width > availableWidth) {
      this.width = availableWidth;
      this.height = this.height * availableWidth / this.width;
    }

    this.padding = Math.min(this.width, this.height) / 10;

    this.buildXScale();
    this.buildColorScale();

    this.svg
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('fill', (d, i) => this.colorScale(i))
      .attr('x', (d, i) => this.xScale((i + 0.1) / this.data.length))
      .attr('width', (d, i) => this.xScale((i + 0.9) / this.data.length) - this.xScale((i + 0.1) / this.data.length))
      .attr('y', d => this.height - this.padding)
      .attr('height', 0);

    this.yAxis = this.svg.append('g')
      .style('font-size', '1rem')
      .style('font-family', 'Arial')
      .attr('transform', `translate(${this.padding}, 0)`);

    this.svg
      .selectAll('text')
      .data(this.labels)
      .enter()
      .append('text')
      .text((d, i) => i < this.data.length ? d : '')
      .attr('x', (d, i) => (this.xScale((i) / this.data.length) + this.xScale((i + 1) / this.data.length)) / 2)
      .attr('y', this.height - 0.5 * this.padding)
      .attr('text-anchor', 'middle')
      .style('font-size', '1rem')
      .style('font-family', 'Arial');

    this.svg
      .append('text')
      .text(this.title)
      .attr('text-anchor', 'middle')
      .style('font-size', '1.2rem')
      .style('font-weight', 'bold')
      .style('font-family', 'Arial')
      .attr('x', this.width / 2)
      .attr('y', 0.5 * this.padding);
  }

  updateChart() {
    this.buildYScale();

    const yAxis = d3.axisLeft(this.yScale);
    this.yAxis.call(yAxis);

    this.svg
      .selectAll('rect')
      .data(this.data)
      .transition()
      .duration(1000)
      .attr('y', d => this.yScale(d))
      .attr('height', d => this.height - this.padding -  this.yScale(d));
  }

  buildSvg() {
    this.svg = d3
      .select('#bar-chart')
      .append('svg')
      .attr('width', `${this.width}px`)
      .attr('height', `${this.height}px`)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);
  }

  buildYScale() {
    const minValue = Math.min(...this.data);
    const maxValue = Math.max(...this.data);
    this.yScale = d3.scaleLinear()
      .domain([Math.min(0, minValue), Math.max(0, maxValue)])
      .range([this.height - this.padding, this.padding]);
  }

  buildXScale() {
    this.xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([this.padding, this.width - this.padding]);
  }

  buildColorScale() {
    const rgb = d3.rgb(this.color);
    const brighter = rgb.brighter();
    const darker = rgb.darker();
    this.colorScale = d3.scaleLinear<string, string>()
      .domain([0, this.data.length])
      .range([darker.toString(), brighter.toString()]);
  }
}
