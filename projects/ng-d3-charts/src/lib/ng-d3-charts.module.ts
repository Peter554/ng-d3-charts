import { NgModule } from '@angular/core';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';

@NgModule({
  declarations: [BarChartComponent, PieChartComponent],
  imports: [
  ],
  exports: [BarChartComponent]
})
export class NgD3ChartsModule { }
