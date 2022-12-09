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

@Injectable({
  providedIn: 'root',
})
export class SubAreaService {
  constructor(
    private dataService: DataService,
    private eventService: EventService,
    private toastService: ToastService,
    private apiService: ApiService,
    private loggerService: LoggerService,
    private loadingService: LoadingService
  ) {}

  async fetchSubArea(id, orcs, subAreaId, date) {
    this.loadingService.addToFetchList(id);
    let res;
    let errorSubject = '';
    try {
      errorSubject = 'sub-area';
      this.loggerService.debug(`Park GET: ${orcs} ${subAreaId}`);
      res = await firstValueFrom(
        this.apiService.get('park', {orcs: orcs, subAreaId: subAreaId })
      );
      res = res.data[0];
      this.dataService.setItemValue(id, res);

      // If we are given a date, we want to get activity details
      if (date && res.activities.length > 0) {
        for (let i = 0; i < res.activities.length; i++) {
          const activity = res.activities[i];

          // ID = accordion-{activity}
          // eg. 'accordion-Day use'
          // This may change depending on how we want to handle accordion data
          this.fetchActivityDetails(
            `accordion-${activity}`,
            orcs,
            subAreaId,
            activity,
            date
          );
        }
      }
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

  //subarea?subAreaId=0001&activity=Day%20Use&date=202204
  async fetchActivityDetails(id, orcs, subAreaId, activity, date) {
    this.loadingService.addToFetchList(id);
    let res;
    let errorSubject = '';
    try {
      // we're getting a single item
      errorSubject = 'sub-area-activity';
      this.loggerService.debug(`Subarea GET: ${orcs} ${subAreaId} ${activity} ${date}`);

      res = await firstValueFrom(
        this.apiService.get('subarea', {
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

  public clearAccordionCache() {
    this.dataService.clearItemValue(Constants.dataIds.ENTER_DATA_SUB_AREA);
    this.dataService.clearItemValue(
      Constants.dataIds.ACCORDION_BACKCOUNTRY_CABINS
    );
    this.dataService.clearItemValue(
      Constants.dataIds.ACCORDION_BACKCOUNTRY_CAMPING
    );
    this.dataService.clearItemValue(Constants.dataIds.ACCORDION_BOATING);
    this.dataService.clearItemValue(Constants.dataIds.ACCORDION_DAY_USE);
    this.dataService.clearItemValue(
      Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS
    );
    this.dataService.clearItemValue(
      Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING
    );
    this.dataService.clearItemValue(Constants.dataIds.ACCORDION_GROUP_CAMPING);
  }
}
