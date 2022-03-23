import { TestBed } from '@angular/core/testing';

import { SubAreaService } from './sub-area.service';

describe('SubAreaService', () => {
  let service: SubAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
