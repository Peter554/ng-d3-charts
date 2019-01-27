import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgD3ChartsModule } from 'ng-d3-charts';
import { BarChartDemoComponent } from './demos/bar-chart-demo/bar-chart-demo.component';
import { ScatterChartDemoComponent } from './demos/scatter-chart-demo/scatter-chart-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartDemoComponent,
    ScatterChartDemoComponent
  ],
  imports: [
    BrowserModule,
    NgD3ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
