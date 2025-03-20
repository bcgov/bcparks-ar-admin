import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

import { FiscalYearLockService } from './fiscal-year-lock.service';

describe('FiscalYearLockService', () => {
  let service: FiscalYearLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ConfigService, provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(FiscalYearLockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
