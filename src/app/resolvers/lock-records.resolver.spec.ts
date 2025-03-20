import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../services/config.service';

import { LockRecordsResolver } from './lock-records.resolver';

describe('LockRecordsResolver', () => {
  let resolver: LockRecordsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ConfigService, provideHttpClient(withInterceptorsFromDi())]
});
    resolver = TestBed.inject(LockRecordsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
