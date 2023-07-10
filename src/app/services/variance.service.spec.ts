import { TestBed } from '@angular/core/testing';

import { VarianceService } from './variance.service';
import { LoggerService } from './logger.service';
import { ConfigService } from './config.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Constants } from '../shared/utils/constants';
import { BehaviorSubject } from 'rxjs';

describe('VarianceService', () => {
  let service: VarianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService,
        ConfigService,
        HttpClient,
        HttpHandler
      ]
    });
    service = TestBed.inject(VarianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch variances', async () => {
    // dont fetch if minimum fields are not provided
    const badParams = {};
    let dataServiceSpy = spyOn(service['dataService'], 'setItemValue');
    let apiServiceSpy = spyOn(service['apiService'], 'get').and.returnValue(new BehaviorSubject({ data: 'success' }));
    await service.fetchVariance(badParams);
    expect(dataServiceSpy).not.toHaveBeenCalled();
    // call with parameters
    const goodParams = {
      subAreaId: '1111',
      activity: 'activity',
      date: '202306',
      lastEvaluatedKey: '12345'
    }
    await service.fetchVariance(goodParams);
    expect(apiServiceSpy).toHaveBeenCalledOnceWith('variance', goodParams);
    expect(dataServiceSpy).toHaveBeenCalledOnceWith(
      Constants.dataIds.VARIANCE_LIST,
      'success'
    );
  })

  it('should throw error if fetch variance fails', async () => {
    let dataServiceSpy = spyOn(service['dataService'], 'setItemValue');
    let errorThrower = spyOn(service['apiService'], 'get').and.callFake(() => {
      throw new Error('error');
    });
    await service.fetchVariance({ subAreaId: '1111', activity: 'activity', date: '202306' })
    expect(errorThrower).toHaveBeenCalledTimes(1);
    expect(dataServiceSpy).toHaveBeenCalledOnceWith(
      Constants.dataIds.VARIANCE_LIST,
      'error'
    );
  });
});
