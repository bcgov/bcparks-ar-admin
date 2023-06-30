import { Injectable } from '@angular/core';
import { Constants } from '../shared/utils/constants';
import { LoadingService } from './loading.service';
import { LoggerService } from './logger.service';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { ToastService, ToastTypes } from './toast.service';
import { EventKeywords, EventObject, EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class VarianceService {

  constructor(
    private loadingService: LoadingService,
    private loggerService: LoggerService,
    private apiService: ApiService,
    private dataService: DataService,
    private toastService: ToastService,
    private eventService: EventService
  ) { }

  async fetchVariance(params) {
    this.loadingService.addToFetchList(Constants.dataIds.VARIANCE_LIST);
    let res;
    let errorSubject = '';
    // subarea and activity are mandatory fields
    if (params.subAreaId && params.activity) {
      try {
        errorSubject = 'variance';
        this.loggerService.debug('Variance GET');

        // 1. organize filter parameters

        let apiParams = {
          subAreaId: params.subAreaId,
          activity: params.activity,
        };

        // set base api params
        if (params.date){
          apiParams['date'] = params.date;
        }

        if (params.lastEvaluatedKey) {
          apiParams['lastEvaluatedKey'] = params.lastEvaluatedKey;
        }

        // 2. fetch data
        res = await firstValueFrom(this.apiService.get('variance', apiParams));
        this.dataService.setItemValue(Constants.dataIds.VARIANCE_LIST, res.data);
      } catch (error) {
        this.loggerService.error(`Error fetching ${errorSubject}: ${error}`);
        this.toastService.addMessage(
          `Variance fetch failed.`,
          `Error getting ${errorSubject}`,
          ToastTypes.ERROR
        );
        this.eventService.setError(
          new EventObject(EventKeywords.ERROR, String(error), 'Variance Service')
        );
        this.dataService.setItemValue(Constants.dataIds.VARIANCE_LIST, 'error');
      }
    }
    this.loadingService.removeToFetchList(Constants.dataIds.VARIANCE_LIST);
  }
}
