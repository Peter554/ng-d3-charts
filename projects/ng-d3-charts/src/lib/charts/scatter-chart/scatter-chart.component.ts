import { Component, OnChanges, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent implements OnChanges {
  @Input()
  width = 800;
  @Input()
  height = 600;
  @Input()
  data: number[][] = [];
  @Input()
  color = '#e0e';
  @Input()
  title = '';
  @Input()
  xLabel = '';
  @Input()
  yLabel = '';
  @Input()
  pointSize = 6;

  @ViewChild('scatterChart')
  scatterChart: ElementRef;

  svg;
  padding;
  firstChange = true;
  tooltip;

  titleNode;
  xLabelNode;
  yLabelNode;
  plotNode;
  xAxisNode;
  yAxisNode;

  xScale;
  yScale;

  ngOnChanges(changes: SimpleChanges) {
    if (this.firstChange) {
      this.buildSvg();

      this.buildXScale();
      this.buildYScale();

      this.setTitle();
      this.setXlabel();
      this.setYlabel();
      this.plotData();

      this.firstChange = false;
    } else {
      this.buildXScale();
      this.buildYScale();

      this.setTitle();

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
    const availableWidth = this.scatterChart.nativeElement.clientWidth;
    if (this.width > availableWidth) {
      this.width = availableWidth;
      this.height = this.height * availableWidth / this.width;
    }

    this.padding = Math.min(this.width, this.height) / 8;

    this.svg = d3
      .select(this.scatterChart.nativeElement)
      .append('svg')
      .attr('width', `${this.width}px`)
      .attr('height', `${this.height}px`)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.titleNode = this.svg.append('g');
    this.xLabelNode = this.svg.append('g');
    this.yLabelNode = this.svg.append('g');
    this.plotNode = this.svg.append('g');

    this.xAxisNode = this.svg.append('g')
    .style('font-size', '1rem')
    .style('font-family', 'Arial')
    .attr('transform', `translate(0, ${this.height - this.padding})`);

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

  setXlabel() {
    this.xLabelNode.selectAll('*').remove();
    this.xLabelNode
      .append('text')
      .text(this.xLabel)
      .attr('text-anchor', 'middle')
      .style('font-size', '1rem')
      .style('font-family', 'Arial')
      .attr('x', this.width / 2)
      .attr('y', this.height - 0.2 * this.padding);
  }

  setYlabel() {
    this.yLabelNode.selectAll('*').remove();
    this.yLabelNode
    .append('text')
    .text(this.yLabel)
    .attr('text-anchor', 'middle')
    .attr('font-size', '1rem')
    .attr('transform', `rotate(-90)`)
    .attr('x', -this.height / 2)
    .attr('y', 0.2 * this.padding);
  }

  plotData() {
    this.plotNode.selectAll('*').remove();
    if (this.data.length > 0) {
      this.plotNode
        .selectAll('circle')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('fill', this.color)
        .attr('cx', (d, i) => this.xScale(d[0]))
        .attr('cy', d => this.height - this.padding)
        .attr('r', this.pointSize);

      this.plotNode
        .selectAll('circle')
        .data(this.data)
        .transition()
        .duration(1000)
        .attr('cy', d => this.yScale(d[1]));

      this.xAxisNode.call(d3.axisBottom(this.xScale));
      this.yAxisNode.call(d3.axisLeft(this.yScale));
    }
  }

  updateData() {
    this.plotNode
    .selectAll('circle')
    .data(this.data)
    .transition()
    .duration(1000)
    .attr('cy', d => this.yScale(d[1]));

    this.xAxisNode.call(d3.axisBottom(this.xScale));
    this.yAxisNode.call(d3.axisLeft(this.yScale));
  }

  buildXScale() {
    this.xScale = d3.scaleLinear()
      .domain(d3.extent(this.data.map(d => d[0])))
      .range([this.padding, this.width - this.padding]);
  }

  buildYScale() {
    this.yScale = d3.scaleLinear()
      .domain(d3.extent(this.data.map(d => d[1])))
      .range([this.height - this.padding, this.padding]);
  }
}
