import { TestBed } from '@angular/core/testing';

import { ParkResolver } from './park.resolver';

describe('ParkResolver', () => {
  let resolver: ParkResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ParkResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
