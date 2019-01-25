import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgD3ChartsModule } from 'ng-d3-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgD3ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
