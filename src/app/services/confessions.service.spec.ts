import { TestBed } from '@angular/core/testing';

import { ConfessionsService } from './confessions.service';

describe('ConfessionsService', () => {
  let service: ConfessionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
