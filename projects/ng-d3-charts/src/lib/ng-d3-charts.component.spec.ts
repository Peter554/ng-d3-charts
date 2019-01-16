import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgD3ChartsComponent } from './ng-d3-charts.component';

describe('NgD3ChartsComponent', () => {
  let component: NgD3ChartsComponent;
  let fixture: ComponentFixture<NgD3ChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgD3ChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgD3ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
