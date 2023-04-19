import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { DataService } from './data.service';
import { EventService } from './event.service';
import { LoadingService } from './loading.service';
import { Constants } from '../shared/utils/constants';

import { ParkService } from './park.service';
import { ToastService } from './toast.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ParkService', () => {
  let service: ParkService;
  let loadingServiceSpy;
  let dataServiceSpy;

  let mockApiService = {
    get: () => {
      return of({
        key: 'value'
      })
    }
  }

  let mockApiServiceThrowError = {
    get: () => {
      return () => {
        throw new Error('error');
      }
    }
  }

  let mockToastService = {
    addMessage: () => {
      // stub
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        DataService,
        EventService,
        {
          provide: ToastService, useValue: mockToastService
        },
        {
          provide: ApiService, useValue: mockApiService
        },
        HttpHandler,
        ConfigService,
        LoadingService,
      ],
    });
  });

  it('should be created and set item values', async () => {
    service = TestBed.inject(ParkService);
    dataServiceSpy = spyOn(service['dataService'], 'setItemValue');
    loadingServiceSpy = spyOn(service['loadingService'], 'addToFetchList');
    let loggerServiceDebugSpy = spyOn(service['loggerService'], 'debug');

    expect(service).toBeTruthy();
    await service.fetchEnterDataPark();

    expect(loadingServiceSpy).toHaveBeenCalledWith(Constants.dataIds.ENTER_DATA_PARK);
    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
    expect(dataServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('it throws an error inside the fetch function', async () => {
    TestBed.overrideProvider(ApiService, { useValue: mockApiServiceThrowError });
    service = TestBed.inject(ParkService);
    loadingServiceSpy = spyOn(service['loadingService'], 'addToFetchList');
    let loggerServiceSpy = spyOn(service['loggerService'], 'error');
    let toastServiceSpy = spyOn(service['toastService'], 'addMessage');

    expect(service).toBeTruthy();
    await service.fetchEnterDataPark();

    expect(loggerServiceSpy).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy).toHaveBeenCalledTimes(1);
  });
});
