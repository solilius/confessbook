import { TestBed } from '@angular/core/testing';

import { FacebookPostsService } from './facebook-posts.service';

describe('FacebookPostsService', () => {
  let service: FacebookPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
