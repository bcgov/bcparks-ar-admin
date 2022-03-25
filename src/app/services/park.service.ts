import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../shared/utils/constants';
import { Utils } from '../shared/utils/utils';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { EventKeywords, EventObject, EventService } from './event.service';
import { ToastService, ToastTypes } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ParkService {
  constructor(
    private dataService: DataService,
    private eventService: EventService,
    private toastService: ToastService,
    private apiService: ApiService
  ) {}
  public utils = new Utils();

  async fetchEnterDataPark() {
    let res;
    let errorSubject = '';
    try {
      // we're getting a single item
      errorSubject = 'park';

      // TODO: Enable this when our endpoint is ready
      res = await firstValueFrom(this.apiService.get('park'));
      let dataObj = this.utils.convertArrayIntoObjForTypeAhead(
        res,
        'name',
        'name'
      );
      this.dataService.setItemValue(Constants.dataIds.ENTER_DATA_PARK, dataObj);
    } catch (e) {
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
  }
}
