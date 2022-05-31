import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../services/config.service';

import { ExportResolver } from './export.resolver';

describe('ExportResolver', () => {
  let resolver: ExportResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, ConfigService],
    });
    resolver = TestBed.inject(ExportResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
