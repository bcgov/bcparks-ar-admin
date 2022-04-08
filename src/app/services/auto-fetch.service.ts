import { Injectable } from '@angular/core';
import { Constants } from '../shared/utils/constants';
import { ParkService } from './park.service';

@Injectable({
  providedIn: 'root',
})
export class AutoFetchService {
  // TODO: This should come in from the config service.
  public timeIntevalSeconds = 60 * 60;
  public fetchQueue = [Constants.dataIds.ENTER_DATA_PARK];

  constructor(private parkService: ParkService) {}

  async run() {
    this.runFetches(this.fetchQueue);
    setInterval(() => {
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
