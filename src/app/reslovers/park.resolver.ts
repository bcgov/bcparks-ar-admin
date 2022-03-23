import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ParkService } from '../services/park.service';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ParkResolver implements Resolve<void> {
  constructor(private parkService: ParkService) {}
  resolve() {
    this.parkService.fetchData(Constants.dataIds.ENTER_DATA_PARK);
  }
}
