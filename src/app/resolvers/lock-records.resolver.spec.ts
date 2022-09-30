import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../services/config.service';

import { LockRecordsResolver } from './lock-records.resolver';

describe('LockRecordsResolver', () => {
  let resolver: LockRecordsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ConfigService]
    });
    resolver = TestBed.inject(LockRecordsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
