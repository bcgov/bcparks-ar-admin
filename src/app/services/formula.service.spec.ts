import { TestBed } from '@angular/core/testing';

import { FormulaService } from './formula.service';

describe('FormulaService', () => {
  let service: FormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
