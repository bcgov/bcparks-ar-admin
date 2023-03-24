import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../shared/utils/constants';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { EventService, EventObject, EventKeywords } from './event.service';
import { ToastService, ToastTypes } from './toast.service';

import * as moment from 'moment';
import { LoadingService } from './loading.service';
import { LoggerService } from './logger.service';
import { Utils } from '../shared/utils/utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(
    private dataService: DataService,
    private eventService: EventService,
    private toastService: ToastService,
    private apiService: ApiService,
    private loggerService: LoggerService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  private utils = new Utils();

  //activity?subAreaId=0001&activity=Day%20Use&date=202204
  async fetchActivityDetails(id, orcs, subAreaId, activity, date) {
    this.loadingService.addToFetchList(id);
    let res;
    let errorSubject = '';
    try {
      // we're getting a single item
      errorSubject = 'sub-area-activity';
      this.loggerService.debug(
        `Subarea GET: ${orcs} ${subAreaId} ${activity} ${date}`
      );

      res = await firstValueFrom(
        this.apiService.get('activity', {
          orcs: orcs,
          subAreaId: subAreaId,
          activity: activity,
          date: date,
        })
      );

      // Date for accordion
      res.lastUpdatedAccordion = res.lastUpdated
        ? moment(new Date(res.lastUpdated)).format('YYYY-MM-DD')
        : 'Never';

      this.dataService.setItemValue(id, res);
    } catch (e) {
      this.loggerService.error(`${e}`);
      this.toastService.addMessage(
        `Please refresh the page.`,
        `Error getting ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(e), 'Sub-area Service')
      );
      // TODO: We may want to change this.
      this.dataService.setItemValue(id, 'error');
    }
    this.loadingService.removeToFetchList(id);
  }

  async postActivity(obj) {
    let res;
    try {
      // We require queryParam type = activity
      // In obj we need subAreaId, activity and date
      if (obj.subAreaId && obj.activity && obj.date) {
        res = await firstValueFrom(
          this.apiService.post('activity', obj, { type: 'activity' })
        );
        this.toastService.addMessage(
          `${obj.activity} - ${this.utils.convertYYYYMMToMMMMYYYY(obj.date)}`,
          `Report Updated`,
          Constants.ToastTypes.SUCCESS
        );
        return res;
      }
    } catch (e) {
      // typescript needs separate function to handle 'e' of type potentially 'unknown'.
      const message = this.getErrorMsg(e);
      this.toastService.addMessage(
        message,
        `Error`,
        Constants.ToastTypes.ERROR
      );

      this.loggerService.error(
        `Post Activity: ${obj.orcs} - ${obj.subAreaName} - ${obj.orcs} - ${obj.date}: ${e}`
      );

      this.router.navigate(['/']);
    }
  }

  getErrorMsg(err): string {
    try {
      const e = err as any;
      if (err.status === 409) {
        return 'Record is locked, unable to edit until record is unlocked.';
      }
    } catch (error) {
      // generic error, fall through
    }
    return 'Failed to update report';
  }
}
