import { TestBed } from '@angular/core/testing';

import { VarianceService } from './variance.service';
import { LoggerService } from './logger.service';
import { ConfigService } from './config.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Constants } from '../shared/utils/constants';
import { BehaviorSubject } from 'rxjs';

describe('VarianceService', () => {
  let service: VarianceService;

  const goodParams = {
    orcs: '0000',
    subAreaId: '1111',
    activity: 'activity',
    date: '202306',
  }

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
    await service.fetchVariance(goodParams);
    expect(apiServiceSpy).toHaveBeenCalledOnceWith('variance', goodParams);
    // variance filters
    expect(dataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.VARIANCE_FILTERS,
      goodParams
    );
    // variance list
    expect(dataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.VARIANCE_LIST,
      'success'
    );
    // variance lastEvaluatedKey
    expect(dataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.VARIANCE_LAST_EVALUATED_KEY,
      null
    );
  })

  it('should throw error if fetch variance fails', async () => {
    let dataServiceSpy = spyOn(service['dataService'], 'setItemValue');
    let errorThrower = spyOn(service['apiService'], 'get').and.callFake(() => {
      throw new Error('error');
    });
    await service.fetchVariance({ subAreaId: '1111', activity: 'activity', date: '202306', orcs: '0000' })
    expect(errorThrower).toHaveBeenCalledTimes(1);
    expect(dataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.VARIANCE_LIST,
      'error'
    );
  });

  it ('should toggle variance resolve', async() => {
    const varianceFetchSpy = spyOn(service, 'fetchVariance');
    const dataServiceSpy = spyOn(service['dataService'], 'getItemValue').and.returnValue(new BehaviorSubject(goodParams));
    const apiServiceSpy = spyOn(service['apiService'], 'put').and.returnValue(new BehaviorSubject('success'));
    await service.resolveVariance('0000', '202307', '1111', 'activity');
    expect(varianceFetchSpy).toHaveBeenCalledTimes(1);
    expect(dataServiceSpy).toHaveBeenCalledWith(
      Constants.dataIds.VARIANCE_FILTERS
    );
    expect(apiServiceSpy).toHaveBeenCalledWith('variance', {
      orcs: '0000',
      subAreaId: '1111',
      activity: 'activity',
      date: '202307',
      resolved: true
    });
  });
});
