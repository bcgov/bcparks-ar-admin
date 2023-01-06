import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';

describe('ApiService', () => {
  let service: ApiService;

  let mockConfigService = {
    config: {
      'API_LOCATION': '/here',
      'API_PUBLIC_PATH': '/there',
      'ENVIRONMENT': 'test'
    }
  }

  let mockHttpClient = {
    post: () => {
      return {};
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient, useValue: mockHttpClient
        },
        HttpHandler,
        {
          provide: ConfigService, useValue: mockConfigService
        },
        LoggerService
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created and setup apiPath', async () => {
    expect(service).toBeTruthy();

    const env = service.getEnvironment() as any;
    expect(env).toBe(undefined);

    await service.init();

    expect(service.apiPath).toEqual('/here/there');

    const postResponse = await service.post('pk', 'sk') as any;
    const getResponse = await service.get('pk') as any;
    expect(postResponse).toEqual({});
    expect(getResponse).toEqual({});
  });
});
