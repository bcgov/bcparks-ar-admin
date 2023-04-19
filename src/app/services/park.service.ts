import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../shared/utils/constants';
import { Utils } from '../shared/utils/utils';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { EventKeywords, EventObject, EventService } from './event.service';
import { LoadingService } from './loading.service';
import { LoggerService } from './logger.service';
import { ToastService, ToastTypes } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ParkService {
  constructor(
    private dataService: DataService,
    private eventService: EventService,
    private toastService: ToastService,
    private apiService: ApiService,
    private loggerService: LoggerService,
    private loadingService: LoadingService
  ) {}
  public utils = new Utils();

  async fetchEnterDataPark() {
    this.loadingService.addToFetchList(Constants.dataIds.ENTER_DATA_PARK);
    let res;
    let errorSubject = '';
    try {
      // we're getting a single item
      errorSubject = 'park';
      this.loggerService.debug(`Park GET`);
      res = await firstValueFrom(this.apiService.get('park'));
      // We shouldn't be converting to typeahead here.
      this.dataService.setItemValue(Constants.dataIds.ENTER_DATA_PARK, res);
    } catch (e) {
      this.loggerService.error(`${e}`);
      this.toastService.addMessage(
        `Please refresh the page.`,
        `Error getting ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(e), 'Park Service')
      );
      // TODO: We may want to change this.
      this.dataService.setItemValue(Constants.dataIds.ENTER_DATA_PARK, 'error');
    }
    this.loadingService.removeToFetchList(Constants.dataIds.ENTER_DATA_PARK);
  }
}
