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
    // park and date are mandatory fields
    if (params.orcs && params.date) {
      // save filter params
      this.dataService.setItemValue(Constants.dataIds.VARIANCE_FILTERS, params);
      try {
        errorSubject = 'variance';
        this.loggerService.debug('Variance GET');

        // set base parameters

        let apiParams = {
          orcs: params.orcs,
          date: params.date,
        };

        // set optional params
        if (params.subAreaId) {
          apiParams['subAreaId'] = params.subAreaId;
        }

        if (params.activity) {
          apiParams['activity'] = params.activity;
        }

        if (params.resolved !== undefined && params.resolved !== '') {
          apiParams['resolved'] = params.resolved;
        }

        if (params.lastEvaluatedKey) {
          apiParams['lastEvaluatedKeyPK'] = params.lastEvaluatedKey?.pk?.S;
          apiParams['lastEvaluatedKeySK'] = params.lastEvaluatedKey?.sk?.S;
        };

        // 2. fetch data
        res = await firstValueFrom(this.apiService.get('variance', apiParams));
        if (params.lastEvaluatedKey) {
          // append new data to existing list
          this.dataService.appendItemValue(Constants.dataIds.VARIANCE_LIST, res.data);
        } else {
          // else set new list data
          this.dataService.setItemValue(Constants.dataIds.VARIANCE_LIST, res.data);
        }
        if (res.lastEvaluatedKey) {
          // save lastEvaluatedKey
          this.dataService.setItemValue(Constants.dataIds.VARIANCE_LAST_EVALUATED_KEY, res.lastEvaluatedKey);
        } else {
          // else remove lastEvaluatedKey
          this.dataService.setItemValue(Constants.dataIds.VARIANCE_LAST_EVALUATED_KEY, null);
        }
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

  async resolveVariance(orcs, date, subAreaId, activity, resolved = true) {
    // to unresolve, pass in resolved = false
    this.loadingService.addToFetchList('resolveVariance');
    let res;
    let errorSubject = '';
    try {
      errorSubject = 'resolveVariance';
      this.loggerService.debug('Variance resolve PUT');

      let body = {
        orcs: orcs,
        date: date,
        subAreaId: subAreaId,
        activity: activity,
        resolved: resolved,
      }

      res = await firstValueFrom(this.apiService.put('variance', body));
      // get filter params
      const filters = this.dataService.getItemValue(Constants.dataIds.VARIANCE_FILTERS);
      // update variance list
      if (filters)
        this.fetchVariance(filters);
    } catch (error) {
      this.loggerService.error(`Error resolving ${errorSubject}: ${error}`);
      this.toastService.addMessage(
        `Variance resolve failed.`,
        `Error resolving ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(error), 'Variance Service')
      );
    }
    this.loadingService.removeToFetchList('resolveVariance');
  }


}
