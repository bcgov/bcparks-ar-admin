import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../services/config.service';

import { SubAreaResolver } from './sub-area.resolver';

describe('SubAreaResolver', () => {
  let resolver: SubAreaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, ConfigService],
    });
    resolver = TestBed.inject(SubAreaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
