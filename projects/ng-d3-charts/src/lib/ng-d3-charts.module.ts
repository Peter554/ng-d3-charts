import { NgModule } from '@angular/core';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { ScatterChartComponent } from './charts/scatter-chart/scatter-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';

@NgModule({
  declarations: [BarChartComponent, PieChartComponent, ScatterChartComponent, LineChartComponent],
  imports: [
  ],
  exports: [BarChartComponent, PieChartComponent, ScatterChartComponent, LineChartComponent]
})
export class NgD3ChartsModule { }
