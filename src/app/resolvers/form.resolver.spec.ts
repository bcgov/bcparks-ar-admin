import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../services/config.service';

import { FormResolver } from './form.resolver';

describe('FormResolver', () => {
  let resolver: FormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler, ConfigService],
    });
    resolver = TestBed.inject(FormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
