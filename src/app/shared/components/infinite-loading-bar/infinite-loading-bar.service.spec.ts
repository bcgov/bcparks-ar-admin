import { TestBed } from '@angular/core/testing';

import { InfiniteLoadingBarService } from './infinite-loading-bar.service';

describe('InfiniteLoadingBarService', () => {
  let service: InfiniteLoadingBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfiniteLoadingBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
