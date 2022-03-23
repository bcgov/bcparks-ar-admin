import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../services/config.service';

import { ParkResolver } from './park.resolver';

describe('ParkResolver', () => {
  let resolver: ParkResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, ConfigService],
    });
    resolver = TestBed.inject(ParkResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
