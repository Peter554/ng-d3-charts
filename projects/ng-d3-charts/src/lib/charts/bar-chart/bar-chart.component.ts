import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges {
  @Input()
  width = 800;
  @Input()
  height = 600;
  @Input()
  data: number[] = [];
  @Input()
  labels: string[] = [];
  @Input()
  color = '#e0e';
  @Input()
  title = '';

  @ViewChild('barChart')
  barChart: ElementRef;

  svg;
  padding;
  firstChange = true;
  tooltip;

  titleNode;
  labelsNode;
  plotNode;
  yAxisNode;

  xScale;
  yScale;
  colorScale;

  ngOnChanges(changes: SimpleChanges) {
    if (this.firstChange) {
      this.buildSvg();

      this.buildXScale();
      this.buildYScale();
      this.buildColorScale();

      this.setTitle();
      this.setLabels();
      this.plotData();

      this.firstChange = false;
    } else {
      this.buildXScale();
      this.buildYScale();
      this.buildColorScale();

      this.setTitle();
      this.setLabels();

      if (changes.color) {
        this.plotData();
      } else if (changes.data) {
        if (changes.data.previousValue && (changes.data.previousValue.length !== changes.data.currentValue.length)) {
          this.plotData();
        } else {
          this.updateData();
        }
      }
    }
  }

  buildSvg() {
    const availableWidth = this.barChart.nativeElement.clientWidth;
    if (this.width > availableWidth) {
      this.width = availableWidth;
      this.height = this.height * availableWidth / this.width;
    }

    this.padding = Math.min(this.width, this.height) / 10;

    this.svg = d3
      .select(this.barChart.nativeElement)
      .append('svg')
      .attr('width', `${this.width}px`)
      .attr('height', `${this.height}px`)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.titleNode = this.svg.append('g');
    this.labelsNode = this.svg.append('g');
    this.plotNode = this.svg.append('g');

    this.yAxisNode = this.svg.append('g')
      .style('font-size', '1rem')
      .style('font-family', 'Arial')
      .attr('transform', `translate(${this.padding}, 0)`);
  }

  setTitle() {
    this.titleNode.selectAll('*').remove();
    this.titleNode
      .append('text')
      .text(this.title)
      .attr('text-anchor', 'middle')
      .style('font-size', '1.2rem')
      .style('font-weight', 'bold')
      .style('font-family', 'Arial')
      .attr('x', this.width / 2)
      .attr('y', 0.5 * this.padding);
  }

  setLabels() {
    this.labelsNode.selectAll('*').remove();
    this.labelsNode
      .selectAll('text')
      .data(this.labels)
      .enter()
      .append('text')
      .text((d, i) => i < this.data.length ? d : '')
      .attr('text-anchor', 'middle')
      .style('font-size', '1rem')
      .style('font-family', 'Arial')
      .attr('x', (d, i) => (this.xScale((i) / this.data.length) + this.xScale((i + 1) / this.data.length)) / 2)
      .attr('y', this.height - 0.5 * this.padding);
  }

  plotData() {
    this.plotNode.selectAll('*').remove();
    if (this.data.length > 0) {
      this.plotNode
        .selectAll('rect')
        .data(this.data)
        .enter()
        .append('rect')
        .attr('fill', (d, i) => this.colorScale(i))
        .attr('x', (d, i) => this.xScale((i + 0.1) / this.data.length))
        .attr('width', (d, i) => this.xScale((i + 0.9) / this.data.length) - this.xScale((i + 0.1) / this.data.length))
        .attr('y', d => this.height - this.padding)
        .attr('height', 0);

      this.plotNode
        .selectAll('rect')
        .data(this.data)
        .transition()
        .duration(1000)
        .attr('y', d => this.yScale(d))
        .attr('height', d => this.height - this.padding -  this.yScale(d));

      this.yAxisNode.call(d3.axisLeft(this.yScale));
    }
  }

  updateData() {
    this.plotNode
    .selectAll('rect')
    .data(this.data)
    .transition()
    .duration(1000)
    .attr('y', d => this.yScale(d))
    .attr('height', d => this.height - this.padding -  this.yScale(d));

    this.yAxisNode.call(d3.axisLeft(this.yScale));
  }

  buildXScale() {
    this.xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([this.padding, this.width - this.padding]);
  }

  buildYScale() {
    const maxValue = Math.max(...this.data);
    this.yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([this.height - this.padding, this.padding]);
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
