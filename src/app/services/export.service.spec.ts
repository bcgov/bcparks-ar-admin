import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { Constants } from '../shared/utils/constants';
import { ApiService } from './api.service';

import { of } from 'rxjs';
import { ExportService } from './export.service';

describe('ExportService', () => {
  let service: ExportService;
  let dataServiceSpy;

  let mockApiService = {
    get: () => {
      return of({
        key: 'value'
      })
    }
  }

  let mockApiServiceNoData = {
    get: () => {
      return of(null)
    }
  }

  let mockApiServiceNoDataThrow = {
    get: () => {
      throw 'Error'
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        ConfigService,
        {
          provide: ApiService, useValue: mockApiService
        }
      ],
    });
  });

  it('should be created and check for reports', async () => {
    service = TestBed.inject(ExportService);
    expect(service).toBeTruthy();
    dataServiceSpy = spyOn(service['dataService'], 'setItemValue');

    await service.checkForReports(Constants.dataIds.EXPORT_ALL_POLLING_DATA, 'standard');
    await service.checkForReports(Constants.dataIds.EXPORT_ALL_POLLING_DATA, 'standard', {
      key: 'value'
    });

    expect(dataServiceSpy).toHaveBeenCalledTimes(2);
  });

  it('should be created and error on checkForReports', async () => {
    TestBed.overrideProvider(ApiService, { useValue: mockApiServiceNoData });
    service = TestBed.inject(ExportService);
    dataServiceSpy = spyOn(service['dataService'], 'setItemValue');
    await service.checkForReports(Constants.dataIds.EXPORT_ALL_POLLING_DATA, {
      key: 'value'
    });

    expect(dataServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should generateReport', async () => {
    TestBed.overrideProvider(ApiService, { useValue: mockApiService });
    service = TestBed.inject(ExportService);
    dataServiceSpy = spyOn(service['dataService'], 'setItemValue');
    await service.generateReport(Constants.dataIds.EXPORT_ALL_POLLING_DATA, 'standard');

    expect(dataServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should generateReport and error', async () => {
    TestBed.overrideProvider(ApiService, { useValue: mockApiServiceNoDataThrow });
    service = TestBed.inject(ExportService);
    let loggerServiceSpy = spyOn(service['loggerService'], 'error');
    await service.generateReport(Constants.dataIds.EXPORT_ALL_POLLING_DATA, 'standard');

    expect(loggerServiceSpy).toHaveBeenCalledTimes(1);
  });
});
