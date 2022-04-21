import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../shared/utils/constants';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { EventService, EventObject, EventKeywords } from './event.service';
import { ToastService, ToastTypes } from './toast.service';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class SubAreaService {
  constructor(
    private dataService: DataService,
    private eventService: EventService,
    private toastService: ToastService,
    private apiService: ApiService
  ) {}

  async fetchSubArea(id, orcs, subAreaName, date) {
    let res;
    let errorSubject = '';
    try {
      errorSubject = 'sub-area';

      res = await firstValueFrom(
        this.apiService.get('park', { orcs: orcs, subAreaName: subAreaName })
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
            subAreaName,
            activity,
            date
          );
        }
      }
    } catch (e) {
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
  }

  //subarea?orcs=0041&subAreaName=Maple%20Bay&activity=Day%20Use&date=202204
  async fetchActivityDetails(id, orcs, subAreaName, activity, date) {
    let res;
    let errorSubject = '';
    try {
      // we're getting a single item
      errorSubject = 'sub-area-activity';

      res = await firstValueFrom(
        this.apiService.get('subarea', {
          orcs: orcs,
          subAreaName: subAreaName,
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
