import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { DataService } from './data.service';
import { EventService } from './event.service';
import { LoadingService } from './loading.service';
import { Constants } from '../shared/utils/constants';
import { SubAreaService } from './sub-area.service';
import { ToastService } from './toast.service';
import { LoggerService } from './logger.service';
import { ApiService } from './api.service';

describe('SubAreaService', () => {
  let dataServiceSpy;
  let subareaService: SubAreaService;

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
        LoadingService
      ],
    });
    subareaService = TestBed.inject(SubAreaService);
    loadingService = TestBed.inject(LoadingService);
    loggerService = TestBed.inject(LoggerService);
    apiService = TestBed.inject(ApiService);
    dataServiceSpy = spyOn(subareaService['dataService'], 'clearItemValue');
    loadingServiceAddSpy = spyOn(subareaService['loadingService'], 'addToFetchList');
    loadingServiceRemoveSpy = spyOn(subareaService['loadingService'], 'removeToFetchList');
    loggerServiceDebugSpy = spyOn(subareaService['loggerService'], 'debug');
    loggerServiceErrorSpy = spyOn(subareaService['loggerService'], 'error');
    apiServiceSpy = spyOn(subareaService['apiService'], 'get');
  });

  it('should be created', () => {
    expect(subareaService).toBeTruthy();
  });

  it('fetches subarea details', async () => {
    await subareaService.fetchSubArea(2, 22, 222, null);

    expect(loadingServiceAddSpy).toHaveBeenCalledWith(2);
    expect(loadingServiceRemoveSpy).toHaveBeenCalledWith(2);
    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);

    expect(apiServiceSpy).toHaveBeenCalledWith('park', { orcs: 22, subAreaId: 222 });
  });

  it('fetches activity details', async () => {
    await subareaService.fetchActivityDetails(1, 11, 111, 1111, null);

    expect(loadingServiceAddSpy).toHaveBeenCalledWith(1);
    expect(loadingServiceRemoveSpy).toHaveBeenCalledWith(1);
    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);

    expect(apiServiceSpy).toHaveBeenCalledWith('subarea',
      {
        orcs: 11,
        subAreaId: 111,
        activity: 1111,
        date: null,
      });
  });

  it('clears accordion cache', async () => {
    subareaService.clearAccordionCache();
    expect(dataServiceSpy).toHaveBeenCalledTimes(8);
    expect(dataServiceSpy).toHaveBeenCalledWith(Constants.dataIds.ENTER_DATA_SUB_AREA);
    expect(dataServiceSpy).toHaveBeenCalledWith(Constants.dataIds.ACCORDION_BACKCOUNTRY_CABINS);
    expect(dataServiceSpy).toHaveBeenCalledWith(Constants.dataIds.ACCORDION_BACKCOUNTRY_CAMPING);
    expect(dataServiceSpy).toHaveBeenCalledWith(Constants.dataIds.ACCORDION_BOATING);
    expect(dataServiceSpy).toHaveBeenCalledWith(Constants.dataIds.ACCORDION_DAY_USE);
    expect(dataServiceSpy).toHaveBeenCalledWith(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS);
    expect(dataServiceSpy).toHaveBeenCalledWith(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING);
    expect(dataServiceSpy).toHaveBeenCalledWith(Constants.dataIds.ACCORDION_GROUP_CAMPING);
  });
});
