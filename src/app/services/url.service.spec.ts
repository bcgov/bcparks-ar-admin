import { TestBed } from '@angular/core/testing';

import { UrlService } from './url.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfigService } from './config.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        ConfigService
      ]
    });
    service = TestBed.inject(UrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
