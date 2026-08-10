import { Injectable, inject } from '@angular/core';
import { Constants } from '../shared/utils/constants';
import { LoggerService } from './logger.service';
import { ParkService } from './park.service';

@Injectable({
  providedIn: 'root',
})
export class AutoFetchService {
  private parkService = inject(ParkService);
  private loggerService = inject(LoggerService);

  // TODO: This should come in from the config service.
  public timeIntevalSeconds = 60 * 60;
  public fetchQueue = [Constants.dataIds.ENTER_DATA_PARK];

  async run() {
    this.runFetches(this.fetchQueue);
    setInterval(() => {
      this.loggerService.debug(`runFetches ${this.fetchQueue}`);
      this.runFetches(this.fetchQueue);
    }, this.timeIntevalSeconds * 1000);
  }
  runFetches(fetchQueue) {
    for (let i = 0; i < fetchQueue.length; i++) {
      const fetchId = fetchQueue[i];
      if (fetchId === Constants.dataIds.ENTER_DATA_PARK) {
        this.parkService.fetchEnterDataPark();
      }
    }
  }
}
