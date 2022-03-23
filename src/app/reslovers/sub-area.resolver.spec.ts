import { TestBed } from '@angular/core/testing';

import { SubAreaResolver } from './sub-area.resolver';

describe('SubAreaResolver', () => {
  let resolver: SubAreaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SubAreaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
