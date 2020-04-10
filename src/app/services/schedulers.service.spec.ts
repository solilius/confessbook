import { TestBed } from '@angular/core/testing';

import { SchedulersService } from './schedulers.service';

describe('SchedulersService', () => {
  let service: SchedulersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
