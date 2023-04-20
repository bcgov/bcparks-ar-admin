import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { DataService } from './data.service';
import { EventService } from './event.service';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';
import { LoggerService } from './logger.service';
import { ApiService } from './api.service';
import { ActivityService } from './activity.service';
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../shared/utils/constants';

describe('ActivityService', () => {
  let dataServiceSpy;
  let activityService: ActivityService;

  let loadingServiceAddSpy;
  let loadingServiceRemoveSpy;
  let loadingService: LoadingService;

  let loggerService: LoggerService;
  let loggerServiceDebugSpy;
  let loggerServiceErrorSpy;

  let apiService: ApiService;
  let apiServiceSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        DataService,
        EventService,
        ToastService,
        HttpHandler,
        ConfigService,
        LoadingService,
      ],
    });
    activityService = TestBed.inject(ActivityService);
    loadingService = TestBed.inject(LoadingService);
    loggerService = TestBed.inject(LoggerService);
    apiService = TestBed.inject(ApiService);
    dataServiceSpy = spyOn(activityService['dataService'], 'clearItemValue');
    loadingServiceAddSpy = spyOn(
      activityService['loadingService'],
      'addToFetchList'
    );
    loadingServiceRemoveSpy = spyOn(
      activityService['loadingService'],
      'removeToFetchList'
    );
    loggerServiceDebugSpy = spyOn(activityService['loggerService'], 'debug');
    loggerServiceErrorSpy = spyOn(activityService['loggerService'], 'error');
    
  });

  it('should be created', () => {
    expect(activityService).toBeTruthy();
  });

  it('fetches activity details', async () => {
    apiServiceSpy = spyOn(activityService['apiService'], 'get');
    await activityService.fetchActivityDetails(1, 11, 111, 1111, null);

    expect(loadingServiceAddSpy).toHaveBeenCalledWith(1);
    expect(loadingServiceRemoveSpy).toHaveBeenCalledWith(1);
    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);

    expect(apiServiceSpy).toHaveBeenCalledWith('activity', {
      orcs: 11,
      subAreaId: 111,
      activity: 1111,
      date: null,
    });
  });

  it ('fetches records when needed', async () => {
    let dataServiceGetSpy = spyOn(activityService['dataService'], 'getItemValue').and.returnValue(null);
    let dataServiceSetSpy = spyOn(activityService['dataService'], 'setItemValue');
    spyOn(activityService['apiService'], 'get').and.returnValue(new BehaviorSubject({pk: 'valid_pk'}));

    await activityService.fetchActivityDetails(1, 11, 111, 1111, null);
    expect(dataServiceSetSpy).toHaveBeenCalledWith(Constants.dataIds.ACCORDION_ALL_AVAILABLE_RECORDS_LIST , [1111]);

    dataServiceSetSpy.calls.reset();
    dataServiceGetSpy.and.returnValue([1111]);

    await activityService.fetchActivityDetails(1, 11, 111, 2222, null);
    expect(dataServiceSetSpy).toHaveBeenCalledWith(Constants.dataIds.ACCORDION_ALL_AVAILABLE_RECORDS_LIST , [1111, 2222]);

  })
});
