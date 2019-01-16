import { TestBed } from '@angular/core/testing';

import { NgD3ChartsService } from './ng-d3-charts.service';

describe('NgD3ChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgD3ChartsService = TestBed.get(NgD3ChartsService);
    expect(service).toBeTruthy();
  });
});
