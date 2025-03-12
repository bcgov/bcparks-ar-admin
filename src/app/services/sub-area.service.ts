import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../shared/utils/constants';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { EventService, EventObject, EventKeywords } from './event.service';
import { ToastService, ToastTypes } from './toast.service';

import { LoadingService } from './loading.service';
import { LoggerService } from './logger.service';
import { ActivityService } from './activity.service';

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
    private loadingService: LoadingService,
    private activityService: ActivityService
  ) { }

  async fetchSubArea(id, orcs, subAreaId, date) {
    this.loadingService.addToFetchList(id);
    let res;
    let errorSubject = '';
    try {
      errorSubject = 'sub-area';
      this.loggerService.debug(`Park GET: ${orcs} ${subAreaId}`);
      res = await firstValueFrom(
        this.apiService.get('park', { orcs: orcs, subAreaId: subAreaId })
      );
      res = res[0] || null;
      this.dataService.setItemValue(id, res);

      // If we are given a date, we want to get activity details
      if (date) {
        // Now that we have historical records in the system,
        // We can't assume that a subarea only has records for the activities it has
        // So we must query for all possible activities.
        let activitiesList = Constants.ActivityTypes;
        this.dataService.clearItemValue(Constants.dataIds.ACCORDION_ALL_AVAILABLE_RECORDS_LIST);
        for (let i = 0; i < activitiesList.length; i++) {
          const activity = activitiesList[i];

          // ID = accordion-{activity}
          // eg. 'accordion-Day use'
          // This may change depending on how we want to handle accordion data
          this.activityService.fetchActivityDetails(
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

  async fetchRegions(regionId = null) {
    // Fetch regions. If regionId is provided, fetch the region with that id.
    let res;
    let errorSubject = 'regions';
    try {
      if (regionId) {
        this.loggerService.debug(`Region GET: ${regionId}`);
        this.loadingService.addToFetchList(Constants.dataIds.CURRENT_REGION);
        res = await firstValueFrom(this.apiService.get('regions', { regionId: regionId }));
        this.dataService.setItemValue(Constants.dataIds.CURRENT_REGION, res);
      } else {
        this.loggerService.debug(`Region GET: all`);
        this.loadingService.addToFetchList(Constants.dataIds.REGION_LIST);
        res = await firstValueFrom(this.apiService.get('regions'));
        this.dataService.setItemValue(Constants.dataIds.REGION_LIST, res);
      }
    } catch (error) {
      this.loggerService.error(`${error}`);
      this.toastService.addMessage(
        `Please refresh the page.`,
        `Error getting ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(error), 'Sub-area Service - Regions')
      );
    }
    this.loadingService.removeToFetchList(Constants.dataIds.REGION_LIST);
    this.loadingService.removeToFetchList(Constants.dataIds.CURRENT_REGION);
    return res;
  };

  async fetchBundles() {
    // Fetch bundle list
    let res;
    let errorSubject = 'bundles';
    try {
      this.loggerService.debug(`Bundle GET: all`);
      this.loadingService.addToFetchList(Constants.dataIds.BUNDLE_LIST);
      res = await firstValueFrom(this.apiService.get('bundles'));
      this.dataService.setItemValue(Constants.dataIds.BUNDLE_LIST, res);
    } catch (error) {
      this.loggerService.error(`${error}`);
      this.toastService.addMessage(
        `Please refresh the page.`,
        `Error getting ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(error), 'Sub-area Service - Bundles')
      );
    }
    this.loadingService.removeToFetchList(Constants.dataIds.BUNDLE_LIST);
    return res;
  }

  async createSubarea(data) {
    let res;
    let errorSubject = 'sub-area';
    try {
      this.loggerService.debug(`Sub-area POST: ${data}`);
      this.loadingService.addToFetchList('creating-subarea');
      res = await firstValueFrom(this.apiService.post('subArea', data));
      this.toastService.addMessage(
        `Sub-area created successfully.`,
        `Success creating ${res}`,
        ToastTypes.SUCCESS
      );
    } catch (error) {
      this.loggerService.error(`${error}`);
      this.toastService.addMessage(
        `Please refresh the page.`,
        `Error creating ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(error), 'Sub-area Service')
      );
    }
    this.loadingService.removeToFetchList('creating-subarea');
    return res;
  }

  async fetchSubareasByOrcs(orcs) {
    // return all subareas belonging to the given orcs.
    let res;
    let errorSubject = '';
    this.loadingService.addToFetchList(Constants.dataIds.CURRENT_SUBAREA_LIST);
    try {
      this.loggerService.debug(`${orcs} - subareas GET: ${orcs}`);
      res = await firstValueFrom(this.apiService.get('park', { orcs: orcs }));
      this.dataService.setItemValue(Constants.dataIds.CURRENT_SUBAREA_LIST, res);
    } catch (error) {
      this.loggerService.error(`${error}`);
      this.toastService.addMessage(
        `Please refresh the page.`,
        `Error getting ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(error), 'Sub-area Service')
      );
    }
    this.loadingService.removeToFetchList(Constants.dataIds.CURRENT_SUBAREA_LIST);
    return res;
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
